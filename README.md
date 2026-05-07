# Looker AI-Ready Superstore Project

This repository is a small Looker project that demonstrates how AI can generate and enhance governed BI assets from a connected BigQuery table.

## What This Project Shows

- A BigQuery-backed Superstore view.
- A governed Explore for business users and conversational analytics.
- Field labels, descriptions, and synonyms so natural language can map to LookML fields.
- Business metrics such as sales, profit, margin, average order value, customer count, and sales per customer.
- Advanced period-over-period measures for YoY and MoM analysis.

## Demo Story

The common objection is that Looker can feel less self-service because business users do not want to learn LookML. This project reframes that objection:

Looker is code-based, API-first, Git-managed, and governed. Those characteristics make it especially suitable for AI-assisted BI creation. AI can read the LookML project, understand the semantic layer, propose new metrics, add synonyms for business language, generate dashboards, validate changes, and submit the result for review.

## Example Conversational Questions

- What were total sales by region last year?
- Which customer segment has the highest profit margin?
- Show sales YoY growth by product category.
- Which products drive the most profit but have high discounts?
- What is the average order value by ship mode?
- Compare this month sales with last month.
- Show revenue, profit, and margin for Corporate customers in the West region.

## Key Files

- `models/superstore_en.model.lkml`: connection, cache policy, and the governed Explore.
- `views/superstore_en.view.lkml`: dimensions, measures, synonyms, drill fields, and period-over-period metrics.
- `manifest.lkml`: enables the new LookML runtime required for newer semantic-layer features such as field synonyms.
