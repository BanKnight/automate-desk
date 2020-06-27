
# automate-desk
用于个人的自动化工具，类似于IFTTT

## 基本类型
+ bool:
+ string:
+ number:需要指定 min,max
+ file：文件，指定suffix
+ folder: 文件夹
+ date：日期
+ time：一天中时间

## inputs 说明

定义输入的数据，最后会构造成 Object

+ 简单例子
```json
"inputs":[
    {"key":"name","type":"string","default":""},
    {"key":"age","type":"number","default":1,"step":1,"min":0,"max":100},
    {"key":"document","type":"folder","default":""},
    {"key":"config","type":"file","default":""},
]
```
+ 数组
```json
    {"key":"names","type":"array","define":{"type":"string","default":""}},
```
+ 对象
带限定字段的对象
```json
    {"key":"names",
    "type":"input",
    "define":[
        {"key":"name","type":"string","default":""},
        {"key":"age","type":"number","default":1,"step":1,"min":0,"max":100},
    ],
    },
```
+ 选项
```json
    {"key":"names","type":"select",
        "options":[
            {"key":"name","title":"名字","val":""},
        ]
    },
```
+ 自定义对象
```json
    {"key":"key","type":"object"},
```
