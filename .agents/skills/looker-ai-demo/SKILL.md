---
name: looker-ai-demo
description: Use when building or operating an AI-generated Looker demo project with LookML semantic models, LookML dashboards, GitHub-connected Looker projects, Looker API deployment, conversational analytics field enrichment, synonyms, period-over-period measures, and production promotion workflows.
---

# Looker AI Demo

Use this skill to turn business intent, schema context, or a dashboard sketch into a governed Looker project that proves AI can help create and operate BI content.

## Core workflow

1. Confirm the Looker project repository and branch that Looker is connected to. In this demo, Looker pulls from `scutteng/looker`.
2. Inspect current LookML before editing: `manifest.lkml`, `models/*.model.lkml`, `views/*.view.lkml`, and `dashboards/*.dashboard.lookml`.
3. Build the semantic layer first, then dashboards:
   - Add `new_lookml_runtime: yes` in `manifest.lkml` when using newer LookML features.
   - Keep the model file small: connection, includes, datagroups, and Explores.
   - Put business definitions in views: labels, group labels, descriptions, synonyms, primary keys, and measures.
   - Use LookML dashboards for Git-managed dashboards. UI-created Looks and dashboards live in Looker's internal database and are not automatically written to Git.
4. Validate with the official Looker validator or Looker API before claiming success.
5. Push to the GitHub repository Looker is connected to, then make Looker pull remote changes.
6. Deploy only after validation returns no blocking errors.

## Semantic modeling patterns

For conversational analytics, optimize field discoverability:

- Add `label`, `group_label`, and `description` to user-facing dimensions and measures.
- Add `synonyms` with English and Chinese business terms where useful.
- Hide technical fields such as row numbers and raw postal codes unless they are useful.
- Prefer governed measures over raw columns for metrics like sales, profit, margin, order count, customer count, and average order value.
- Use compact value formats for dashboard KPI money fields when numbers are long, for example `"$0.0,,\"M\""`.
- For period-over-period analysis, use Looker's period-over-period measure types when the instance supports the new LookML runtime.

## LookML dashboard rules learned from this demo

- LookML dashboards appear under LookML Dashboards. They can be converted/imported to user-defined dashboards if the user wants them in regular dashboard folders.
- Include dashboards from the model file, for example `include: "/dashboards/*.dashboard.lookml"`.
- `date_filter` filters should not include `model`, `explore`, or `field`; those parameters are for `field_filter`.
- Dashboard element `listen` mappings connect generic filter names to concrete fields.
- Set date defaults to match the dataset range. If Superstore data ends in 2021, avoid current-year defaults that render empty dashboards.

## Looker API deployment

Use `.vscode/settings.json` for local API settings when present:

- `looker.instanceURL`
- `looker.clientId`
- `looker.clientSecret`
- `looker.projectId`

Do not print credentials. If the instance URL ends in `/browse`, strip that suffix before API calls.

Preferred deployment sequence:

1. Login: `POST /api/4.0/login`
2. Switch to dev: `PATCH /api/4.0/session` with `{"workspace_id":"dev"}`
3. Confirm branch: `GET /api/4.0/projects/{project_id}/git_branch`
4. Pull from Git: `POST /api/4.0/projects/{project_id}/reset_to_remote`
5. Validate: `POST /api/4.0/projects/{project_id}/validate`
6. If validation has no `error` or `fatal` severity, deploy: `POST /api/4.0/projects/{project_id}/deploy_to_production`
7. Switch to production and confirm ref.

`deploy_ref_to_production` is for advanced deploy mode and may return 404 when that mode is not enabled. Fall back to `deploy_to_production`.

The bundled script runs this sequence:

```bash
node .agents/skills/looker-ai-demo/scripts/looker_deploy.js
```

## GitHub notes

If local Git credentials cannot push, use the GitHub connector to update files on the branch connected to Looker. After connector commits, local commits may have different SHAs from remote; avoid destructive resets unless the user explicitly asks. Compare refs before pushing.

## Completion checklist

- GitHub branch contains the intended LookML.
- Looker dev branch has pulled the same remote ref.
- LookML validation returns no errors.
- Production ref matches the validated commit.
- Dashboard defaults return data and KPI number formats fit in tiles.
