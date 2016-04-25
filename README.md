# command.blog

chrome浏览器命令行的博客，[查看demo](http://xuexb.github.io/command.blog/)，[我博客的真实数据](https://xuexb.com/)，灵感来自 [52cik.com](http://www.52cik.com/)

## 使用

```html
<!-- 引用代码 -->
<script type="text/javascript" src="//raw.githubusercontent.com/xuexb/command.blog/gh-pages/index.js"></script>

<script type="text/javascript">
    // 创建控制台
    command.create(options);
</script>
```

## api

### command.create(options)

```js
/**
 * 创建控制台
 *
 * @description 会覆盖window[key]方法以具备在控制台内直接打命令运行
 * @param {Object}              optioins            配置对象
 * @param {Array|Function}      options.data        数据，如果是方法则认为返回Promise
 * @param {string}              options.name        名称，显示在每条结果的最后
 */
```

### command.noConflict()

```js
/**
 * 恢复代码
 *
 * @description 将把之前覆盖的window[key]方法还原
 */
```

### options

#### options.name

控制台名称，用来显示在每条命令后面

#### options.data

数据对象，如果同步数据可直接使用`[]`数组，如果是异步可以为`Function`并返回`Promise`对象，数据格式如：

```json
[
    {
        "title": "文章标题",
        "url": "文章链接，必须是带http的绝对链接",
        "tags": ["文章标签，可选，数组", "2"]
    }
]
```

同步数据如：

```js
command.create({
    data: [
        {
            "title": "文章标题",
            "url": "https://xuexb.com/html/1.html"
        },
        {
            "title": "文章标题2",
            "url": "https://xuexb.com/html/2.html",
            "tags": ["标签1", "标签2"]
        }
    ],
    name: '前端小武'
});
```

异步数据如：

```js
// 只是例子，别当真
command.create({
    data: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },
    name: '前端小武'
});
```

## todo

- [x] 标签功能
- [x] 搜索功能
- [ ] 分页