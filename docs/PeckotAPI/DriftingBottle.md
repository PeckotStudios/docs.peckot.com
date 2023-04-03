---
id: DriftingBottle
title: 漂流瓶接口
tags:
  - '接口'
  - '漂流瓶'
---

## 接口简介

该接口是一个简单的漂流瓶后端接口，提供了三个操作：pick（随机获取一个漂流瓶）、throw（投掷一个漂流瓶）和remove[^1]（删除多个符合特定条件的漂流瓶）。

**接口地址**

```text
https://api.peckot.com/DriftingBottle
```

## 请求参数

:::caution
该接口所有请求都需要在请求体标头提供 APIKey ，否则将返回 401 错误。
:::

### 操作方式

请求体中需要包含一个可选的 `operation` 参数，用于指定该请求的操作方式。

**operation**参数

| 操作方式 | 可选性 | 参数值 | 描述 |
|-------|-------|--------|------|
| PICK | ✔️ | "pick" | 拾取漂流瓶 |
| THROW | ❌ | "throw" | 投掷漂流瓶 |
| REMOVE[^1] | ❌ | "remove" | 删除漂流瓶 |

### PICK操作

该操作无需指定参数，直接发起请求即可获取随机漂流瓶。

### THROW操作

| 可选性 | 参数 | 类型 | 默认值 | 描述 | 可选值 |
|-------|------|-----|--------|------|-------|
| ✔️ | input | string | - | 是否使用GET扁平化输入 | "flat" |
| ❌ | content | string | - | 投掷漂流瓶的内容 | - |
| ❌ | from | object | - | 投掷者的信息 | - |

**from**对象

| 参数 | 类型 | 描述 |
|------|------|------|
| platform | string | 投掷漂流瓶使用的平台 |
| thrower | object | 投掷者的信息 |

**from.thrower**对象

| 参数 | 类型 | 描述 |
|------|------|------|
| nick | string | 投掷者的昵称 |
| uid | string | 投掷者的唯一标识符 |

#### input 参数

对于投掷漂流瓶的操作，我们提供了一个 `input` 参数来方便用户使用 `GET` 请求来调用接口。 

当参数被指定为 `input=flat` 时，所有投掷需要提供的参数将通过扁平化数据输入。 

:::caution
该参数仅用于 `GET` 类型的请求，其他方式无法使用该特性。
:::

| 可选性 | 参数 | 类型 | 描述 |
|------|------|------|------|
| ❌ | content | string | 投掷漂流瓶的内容 |
| ❌ | platform | string | 投掷漂流瓶使用的平台 |
| ❌ | nick | string | 投掷者的昵称 |
| ❌ | uid | string | 投掷者的唯一标识符 |

以下是一个使用了GET扁平化数据请求示例:

**请求**

```bash
# GET请求
curl 'https://api.peckot.com/DriftingBottle?operation=throw&
  input=flat&
  content=Hello!&
  platform=QGuild&
  nick=Pectics&
  uid=2671876934'
```

### REMOVE[^1]操作

:::caution
该操作涉及大量数据更改，需要管理员权限。
:::

| 可选性 | 参数 | 类型 | 默认值 | 描述 | 可选值 |
|-------|------|-----|--------|------|-------|
| ❌ | filter | string | - | 过滤条件，用于删除多个符合条件的漂流瓶 | - |

**filter**参数

filter 参数必须是符合 MongoDB 查询语法的 JSON 字符串，例如：

```json
{
  "i": "100001",
  "c": "Hello!"
}
```

## 返回结果

| 响应 | 参数 | 类型 | 描述 |
|-----|------|------|------|
| ALL | code | integer | HTTP 状态码 |
| ALL | message | string | 响应状态信息 |
| SUCCESS | data | object | 主要响应数据 |

**data**响应数据

三个操作中返回的数据均存储在 `data` 参数中，`data` 的响应数据如下。

| 参数 | 类型 | 描述 |
|------|------|------|
| bottles | array[object] | 包含此次操作的漂流瓶对象数组 |

:::tip
* PICK操作时，`bottles` 参数包含了本次拾取到的漂流瓶对象数组；
* THROW操作时，`bottles` 参数包含了本次投掷的漂流瓶对象数组；
* REMOVE[^1]操作时，`bottles` 参数中包含了本次删除的漂流瓶对象数组。
:::

## 使用示例

### PICK操作

以下是一个典型的请求和响应示例:

**请求**

```bash
# GET请求
curl 'https://api.peckot.com/DriftingBottle?operation=pick'
# POST请求
curl 'https://api.peckot.com/DriftingBottle' \
  -H 'Content-Type: application/json' \
  -d '{
    "operation": "pick"
  }'
```

**响应**

```json
{
  "code": 200,
  "message": "Data request succeeded!",
  "data": {
    "bottles": [
      {
        "id": 100000,
        "timestamp": 1522104284077,
        "content": "Hello, stranger!",
        "from": {
          "platform": "QGuild",
          "thrower": {
            "nick": "Pectics",
            "uid": "2671876934"
          }
        }
      }
    ]
  }
}
```

### THROW操作

以下是一个典型的请求和响应示例:

**请求**

```bash
# GET请求
curl 'https://api.peckot.com/DriftingBottle?operation=throw&
  content=Hello!&
  from={
    "platform": "QGuild",
    "thrower": {
      "nick": "Pectics",
      "uid": "2671876934"
    }
  }'
# POST请求
curl 'https://api.peckot.com/DriftingBottle' \
  -H 'Content-Type: application/json' \
  -d '{
    "operation": "throw",
    "content": "Hello!",
    "from": {
      "platform": "QGuild",
      "thrower": {
        "nick": "Pectics",
        "uid": "2671876934"
      }
    }
  }'
```

### REMOVE[^1]操作

以下是一个典型的请求和响应示例:

**请求**

```bash
# GET请求
curl 'https://api.peckot.com/DriftingBottle?operation=remove&
  filter={
    "i": 100000,
    "c": "Hello!"
  }'
# POST请求
curl 'https://api.peckot.com/DriftingBottle' \
  -H 'Content-Type: application/json' \
  -d '{
    "operation": "remove",
    "filter": {
      "i": 100000,
      "c": "Hello!"
    }
  }'
```

**响应**

```json
{
  "code": 200,
  "message": "Successfully remove 1 bottle!",
  "data": {
    "bottles": {
      "id": 100000,
      "timestamp": 1522104284077,
      "content": "Hello, stranger!",
      "from": {
        "platform": "QGuild",
        "thrower": {
          "nick": "Pectics",
          "uid": "2671876934"
        }
      }
    }
  }
}
```

## 异常处理

当请求参数不正确或请求失败时，API返回一个错误响应以帮助调试。以下是一个错误响应示例：

```json
{
  "code": 400,
  "message": "There was an invalid argument in the request!",
  "advice": "Confirm whether your parameters are correct."
}
```

[^1]：该操作需要管理员权限。