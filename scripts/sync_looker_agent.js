#!/usr/bin/env node

const fs = require("fs");

const settingsPath = process.env.LOOKER_SETTINGS_PATH || ".vscode/settings.json";
const agentConfigPath = process.env.AGENT_CONFIG_PATH || "agents/superstore-agent.yaml";
const targetAgentId = process.env.LOOKER_AGENT_ID;

const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
const instructions = fs.readFileSync(agentConfigPath, "utf8");

const base = settings["looker.instanceURL"]
  .replace(/\/browse\/?$/, "")
  .replace(/\/$/, "");
const clientId = settings["looker.clientId"];
const clientSecret = settings["looker.clientSecret"];

if (!base || !clientId || !clientSecret) {
  throw new Error("Missing Looker API settings.");
}

function matchRequired(pattern, label) {
  const match = instructions.match(pattern);
  if (!match) throw new Error(`Unable to parse ${label} from ${agentConfigPath}.`);
  return match[1].trim();
}

const agentName = matchRequired(/^\s*name:\s*(.+)$/m, "agent name");
const description = matchRequired(/^\s*description:\s*(.+)$/m, "description");
const model = matchRequired(/^\s*-\s*model:\s*(.+)$/m, "model");
const explore = matchRequired(/^\s*explore:\s*(.+)$/m, "explore");
const categoryMatch = instructions.match(/^\s*category:\s*(.+)$/m);
const category = categoryMatch ? categoryMatch[1].trim() : "";

let token = "";

async function request(method, path, body) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Keep non-JSON responses as text.
  }

  console.log(`${method} ${path} -> ${response.status}`);
  if (!response.ok) {
    console.log(typeof data === "string" ? data : JSON.stringify(data, null, 2));
    throw new Error(`${method} ${path} failed with ${response.status}`);
  }
  return data;
}

async function login() {
  const response = await fetch(`${base}/api/4.0/login`, {
    method: "POST",
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Looker login failed with ${response.status}`);
  }
  token = data.access_token;
}

async function main() {
  await login();

  const fields = "id,name,description,sources,context,category,code_interpreter,content_metadata_id";
  const existing = targetAgentId
    ? [{ id: targetAgentId }]
    : await request(
        "GET",
        `/api/4.0/agents/search?name=${encodeURIComponent(agentName)}&limit=10&fields=${encodeURIComponent(fields)}`
      );

  const payload = {
    name: agentName,
    description,
    sources: [{ model, explore }],
    context: { instructions },
    code_interpreter: false,
  };

  if (category && category !== "null") {
    payload.category = category;
  }

  const agent =
    Array.isArray(existing) && existing.length > 0
      ? await request(
          "PATCH",
          `/api/4.0/agents/${encodeURIComponent(existing[0].id)}?fields=${encodeURIComponent(fields)}`,
          payload
        )
      : await request(
          "POST",
          `/api/4.0/agents?fields=${encodeURIComponent(fields)}`,
          payload
        );

  console.log(`agent_id ${agent.id}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});

