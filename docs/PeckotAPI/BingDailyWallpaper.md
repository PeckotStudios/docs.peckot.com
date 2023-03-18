---
id: BingDailyWallpaper
title: Bing每日壁纸接口
tags:
  - '接口'
  - '图片'
  - '必应'
  - '壁纸'
---

## 接口简介

该接口从必应获取不同日期的壁纸信息、并以JSON或是图片的形式返回，且包括多种可用分辨率。

**接口地址**

```text
https://api.peckot.com/BingDailyWallpaper
```

## 请求参数

:::tip
所有参数均为可选参数，当值未给出时默认为所列出的默认值。
:::

:::note
**size** 参数的**所有可选值**为：  
"1920x1200"、"1366x768"、"1280x768"、"1024x768"、  
"800x600"、"800x480"、"768x1280"、"720x1280"。
:::

| 可选性 | 参数 | 类型 | 默认值 | 描述 | 可选值 |
|-------|------|-----|--------|------|-------|
| ✔️ | area | string | "cn" | 图片壁纸所在的区域 | ISO2[^1] 国家代码 |
| ✔️ | type | string | "json" | 返回格式类型 | "json"、"image" |
| ✔️ | node | string | "default" | Bing域名节点 | "default"、"interl" |
| ✔️ | size | string | "1920x1080" | 壁纸的分辨率 | "1920x1200"、"1366x768"等 |
| ✔️ | date | integer | 0 | 壁纸日期，0为今天，n为n天前 | 0-7 |
| ✔️ | num | integer | 1 | 获取的壁纸数量 | 1-8 |

## 返回结果

### JSON类型响应

对于 JSON 类型的响应，它的返回值是一个JSON格式对象，以下是每个字段的解释：  

| 响应 | 参数 | 类型 | 描述 |
|-----|------|------|------|
| ALL | code | integer | HTTP 状态码 |
| ALL | message | string | 响应状态信息 |
| FAILED | advice | string | 请求失败时的错误提示 |
| SUCCESS | data | object | 包含壁纸信息的响应数据 |

**data 字段包含了一个壁纸信息数组，其中每个元素包含以下字段：**

- date: 当前壁纸的日期
- url: 壁纸图像的URL链接
- copyright: 壁纸图像的版权信息
- copyrightlink: 指向原壁纸图片的链接
- hashcode: 该壁纸图像的哈希码

### IMAGE类型响应

所有 IMAGE 类型响应将直接重定向到所请求壁纸图片的URL链接。

## 使用示例

以下是一个典型的API请求和响应示例：

**请求**

```bash
# GET请求
curl 'https://api.peckot.com/BingDailyWallpaper?type=json&num=1'
# POST请求
curl 'https://api.peckot.com/BingDailyWallpaper' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "json",
    "num": 1
  }'
```

**响应**

```json
{
  "code": 200,
  "message": "Data request succeeded!",
  "data": {
    "images": [
      {
        "date": "20230318",
        "url": "https://cn.bing.com/th?id=OHR.MarsTars_ZH-CN0496313394_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "copyright": "甘博阿陨击坑，火星 (© NASA/JPL-Caltech/University of Arizona)",
        "copyrightlink": "https://www.bing.com/search?q=%E7%81%AB%E6%98%9F&form=hpcapt&mkt=zh-cn",
        "hashcode": "919a80fbf9db69d5625f3c576e779e35"
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
  "message": "Data request failed! Error: ${ErrorMessage}",
  "advice": "Confirm whether your parameters are correct."
}
```

[^1]: ISO 3166-1 二位字母代码，详见 [维基百科-中文](https://zh.wikipedia.org/wiki/ISO_3166-1_alpha-2)。