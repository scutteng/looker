# Superstore Conversational Analytics Agent

这个文档记录 Superstore demo 的 Looker Conversational Analytics agent 设计。

## Agent 配置

配置文件：

```text
agents/superstore-agent.yaml
```

同步到 Looker：

```bash
node scripts/sync_looker_agent.js
```

如果要更新已有 agent：

```bash
LOOKER_AGENT_ID=<agent_id> node scripts/sync_looker_agent.js
```

注意：为了让 API-created agent 在 Looker UI 默认 agent 列表可见，创建 payload 不要传 `category: "conversation"`。保持 `category` 为空。

## Instruction 设计重点

Superstore 和 gaming payrate demo 不一样。Gaming 的核心是同一个指标有多个口径，要主动澄清。Superstore 的核心是经营分析问题很多，agent 要默认选对 governed LookML measure。

### 核心指标映射

- 销售额、收入、GMV：`sales`
- 利润、毛利：`profit`
- 利润率、毛利率：`profit_margin`
- 客单价、AOV：`average_order_value`
- 订单数：`order_count`
- 客户数：`customer_count`
- 销量、件数：`quantity`
- 客均销售额、ARPC：`sales_per_customer`

### 风险和诊断

- 平均折扣：`discount`
- 折扣金额：`discount_amount`
- 折扣销售占比：`discount_to_sales_ratio`
- 高折扣销售额：`high_discount_sales`
- 亏损金额：`loss_amount`
- 亏损明细数：`loss_line_count`
- 盈亏状态：`profit_status`

### 日期规则

- 销售和利润趋势默认用 `order_date` / `order_month` / `order_year`。
- 发货相关问题才用 `ship_date`。
- 如果用户问“今年”但数据集没有当前年份，要解释 demo 数据只覆盖历史日期，并建议看数据集最新年份。

### 澄清规则

- 用户问“表现如何”时，要澄清是销售额、利润、利润率还是订单量。
- 用户问“最好/Top”时，如果没有指定指标，默认可建议按销售额排序，也可以说明按利润或利润率会得到不同答案。
- 用户问“客户情况”时，需要判断是客户数、客户名单、客均销售额还是细分客群。

