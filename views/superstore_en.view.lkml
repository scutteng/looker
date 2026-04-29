view: superstore_en {
  sql_table_name: `proj-terence-01.superstore_01.superstore_en` ;;

  dimension: category {
    type: string
    sql: ${TABLE}.Category ;;
  }
  dimension: city {
    type: string
    sql: ${TABLE}.City ;;
  }
  dimension: country_region {
    type: string
    sql: ${TABLE}.Country_Region ;;
  }
  dimension: customer_id {
    type: string
    sql: ${TABLE}.`Customer ID` ;;
  }
  dimension: customer_name {
    type: string
    sql: ${TABLE}.`Customer Name` ;;
  }
  measure: discount {
    type: average
    sql: ${TABLE}.Discount ;;
  }
  dimension_group: order {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.`Order Date` ;;
  }
  dimension: order_id {
    type: string
    sql: ${TABLE}.`Order ID` ;;
  }
  dimension: postal_code {
    type: number
    sql: ${TABLE}.`Postal Code` ;;
  }
  dimension: product_id {
    type: string
    sql: ${TABLE}.`Product ID` ;;
  }
  dimension: product_name {
    type: string
    sql: ${TABLE}.`Product Name` ;;
  }
  measure: profit {
    type: sum
    sql: ${TABLE}.Profit ;;
  }
  measure: quantity {
    type: sum
    sql: ${TABLE}.Quantity ;;
  }
  dimension: region {
    type: string
    sql: ${TABLE}.Region ;;
  }
  dimension: row_id {
    type: number
    sql: ${TABLE}.`Row ID` ;;
  }
  measure: sales {
    type: sum
    sql: ${TABLE}.Sales ;;
  }
  dimension: segment {
    type: string
    sql: ${TABLE}.Segment ;;
  }
  dimension_group: ship {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.`Ship Date` ;;
  }
  dimension: ship_mode {
    type: string
    sql: ${TABLE}.`Ship Mode` ;;
  }
  dimension: state {
    type: string
    sql: ${TABLE}.State ;;
  }
  dimension: subcategory {
    type: string
    sql: ${TABLE}.`Sub-Category` ;;
  }
  measure: count {
    type: count
    drill_fields: [product_name, customer_name]
  }
}
