connection: "default_bigquery_connection"

datagroup: superstore_en_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: superstore_en_default_datagroup

