connection: "default_bigquery_connection"

include: "/views/superstore_en.view.lkml"
include: "/dashboards/*.dashboard.lookml"

datagroup: superstore_en_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: superstore_en_default_datagroup

explore: superstore_en {
  label: "Superstore Conversational Analytics"
  group_label: "AI Demo"
  description: "A governed Explore for natural language and conversational analytics across sales, profit, customers, products, geography, and shipping."

  fields: [
    ALL_FIELDS*,
    -superstore_en.row_id,
    -superstore_en.postal_code
  ]
}
