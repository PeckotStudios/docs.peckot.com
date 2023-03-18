---
id: DuckDuckGoSearch
title: DuckDuckGo搜索接口
tags:
  - '接口'
  - '搜索'
  - 'DuckDuckGo'
---

## 接口简介

:::tip
该接口实际上是 `https://ddg-api.herokuapp.com/search` 这个接口的套壳，使用现有的接口可以节省计算资源并提高响应速度。  
但为了保证稳定性，在上游接口出现错误或无响应时仍然会进行本地爬取和分析，故该接口会概率出现加载超时等问题。
:::

该接口从 DuckDuckGo 或者一个备用的 API 获取指定关键字的搜索结果，可以选择日期范围和返回的结果数，并返回一个包含每个搜索结果的标题、链接和摘要的对象数组。

**接口地址**

```text
https://api.peckot.com/DuckDuckGoSearch
```

## 请求参数

:::caution
**keyword** 为必选参数，若未提供将返回错误！
:::

| 可选性 | 参数 | 类型 | 默认值 | 描述 | 可选值 |
|-------|------|-----|--------|------|-------|
| ❌ | keyword | string | - | 要搜索的关键字 | - |
| ✔️ | amount | integer | 5 | 要返回的搜索结果数 | 1-50 |
| ✔️ | time | string | null | 搜索的日期范围 | "year"、"month"、"week"、"day"、null |

## 返回结果

| 响应 | 参数 | 类型 | 描述 |
|-----|------|------|------|
| ALL | code | integer | HTTP 状态码 |
| ALL | message | string | 响应状态信息 |
| FAILED | advice | string | 请求失败时的错误提示 |
| SUCCESS | data | array[object] | 包含每个搜索结果的标题、链接和摘要的对象数组 |

每个对象都包括以下字段:
- title: 搜索结果的标题。
- link: 搜索结果的链接。
- snippet: 搜索结果的摘要。

## 使用示例

以下是一个典型的请求和响应示例:

**请求**

```bash
# GET请求
curl 'https://api.peckot.com/DuckDuckGoSearch?keyword=Peckot%20API&amount=1'
# POST请求
curl 'https://api.peckot.com/DuckDuckGoSearch' \
  -H 'Content-Type: application/json' \
  -d '{
    "keyword": "Peckot API",
    "amount": 1
  }'
```

**响应**

```json
{
  "code": 200,
  "message": "Data request succeeded!",
  "data": {
    "results": [
      {
        "title": "Peckot Studios | Welcome",
        "link": "https://peckot.com/?lang=en",
        "snippet": "注册账户 PeckotMC 关于我们 Some feature here. Some text here. Some feature here. Some text here. Some feature here. Some text here. 我们的在营项目 由 Peckot Studios 或其附属小组开发并保持维护的相关作品 PeckotMC 由 Peckot Studios 运营的一个基于 Minecraft: Java Edition 的多人游戏服务器。 ..."
      }
    ]
  }
}
```

### 异常处理

当请求参数不正确或请求失败时，API返回一个错误响应以帮助调试。以下是一个错误响应示例：

```json
{
  "code": 400,
  "message": "Data request failed! Error: Please provide the keyword parameter!",
  "advice": "Confirm whether your parameters are correct."
}
```
