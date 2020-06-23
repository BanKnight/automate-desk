# ide

> An electron-vue project

# 设置源
> 参考地址：https://www.jianshu.com/p/568db76a7b45
```bash
npm config set registry https://registry.npm.taobao.org/

npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

```

## install
```bash
npm install
# 每次运行"npm install"后，也运行这条命令
./node_modules/.bin/electron-rebuild

# 在windows下如果上述命令遇到了问题，尝试这个：
.\node_modules\.bin\electron-rebuild.cmd

electron-builder install-app-deps
```

## 读取assets中的图片
```html
<img id="logo" src="~@/assets/logo.png" alt="electron-vue">
```

## 文档地址
+ electron-vue：https://simulatedgreg.gitbooks.io/electron-vue/content/cn/
+ electron官网：https://electronjs.org/docs
+ static目录：https://newsn.net/say/electron-vue-static.html
+ 一个比较有用的blog：https://newsn.net/category/electron/1/

## 安装中各种下载慢的问题解决
> 参考：https://blog.csdn.net/cctvcqupt/article/details/87904368
> 注意：可以学习这里面的预先下载，放到特定目录的方式来解决，不要使用smart-npm

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


