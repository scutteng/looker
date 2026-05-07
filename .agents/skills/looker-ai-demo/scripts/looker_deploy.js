#!/usr/bin/env node

const fs = require("fs");

const settingsPath = process.argv[2] || ".vscode/settings.json";
const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));

const base = (settings["looker.instanceURL"] || "")
  .replace(/\/browse\/?$/, "")
  .replace(/\/$/, "");
const clientId = settings["looker.clientId"];
const clientSecret = settings["looker.clientSecret"];
const projectId = settings["looker.projectId"];

if (!base || !clientId || !clientSecret || !projectId) {
  throw new Error(
    `Missing Looker settings in ${settingsPath}. Required: looker.instanceURL, looker.clientId, looker.clientSecret, looker.projectId.`
  );
}

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
    // Keep non-JSON API responses as text.
  }

  console.log(`\n${method} ${path} -> ${response.status}`);
  if (data !== null) {
    console.log(typeof data === "string" ? data : JSON.stringify(data, null, 2));
  }

  if (!response.ok) {
    throw new Error(`${method} ${path} failed with ${response.status}`);
  }

  return data;
}

async function login() {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${base}/api/4.0/login`, {
    method: "POST",
    body,
  });
  const data = await response.json();
  console.log("login", response.status);

  if (!response.ok) {
    throw new Error(`Looker login failed with ${response.status}`);
  }

  token = data.access_token;
}

function blockingValidationErrors(validation) {
  return (validation.errors || []).filter(
    (error) => error.severity === "error" || error.severity === "fatal"
  );
}

async function main() {
  await login();

  await request("PATCH", "/api/4.0/session", { workspace_id: "dev" });
  await request("GET", `/api/4.0/projects/${encodeURIComponent(projectId)}/git_branch`);
  await request("POST", `/api/4.0/projects/${encodeURIComponent(projectId)}/reset_to_remote`);
  const branch = await request(
    "GET",
    `/api/4.0/projects/${encodeURIComponent(projectId)}/git_branch`
  );
  const validation = await request(
    "POST",
    `/api/4.0/projects/${encodeURIComponent(projectId)}/validate`
  );

  const blockers = blockingValidationErrors(validation);
  console.log("\nblocking_errors", blockers.length);

  if (blockers.length > 0) {
    process.exitCode = 2;
    return;
  }

  await request(
    "POST",
    `/api/4.0/projects/${encodeURIComponent(projectId)}/deploy_to_production`
  );
  await request("PATCH", "/api/4.0/session", { workspace_id: "production" });
  const production = await request(
    "GET",
    `/api/4.0/projects/${encodeURIComponent(projectId)}/git_branch`
  );

  console.log("\nsummary");
  console.log(`dev_ref ${branch.ref}`);
  console.log(`production_ref ${production.ref}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
