KityMinder Editor
==========

## 简介

KityMinder Editor 是一款强大、简洁、体验优秀的脑图编辑工具，适合用于编辑树/图/网等结构的数据。

编辑器由百度 [FEX](https://github.com/fex-team) 基于 [kityminder-core](https://github.com/fex-team/kityminder-core) 搭建，并且在[百度脑图](http://naotu.baidu.com)中使用。

在KityMinder Editor基础上，实现了脑图的上传、下载、导入、导出，以及多用户协同。

## 开发使用
根目录下的 `index.html` 为开发环境，`dist` 目录下的 `index.html` 使用打包好的代码，适用于线上环境。

1. 安装 [nodejs](http://nodejs.org) 和 [npm](https://docs.npmjs.com/getting-started/installing-node)
2. 初始化：切到 kityminder-editor 根目录下运行 `npm run init`
3. 在 kityminder-editor 根目录下运行 `grunt dev` 即可启动项目
4. 你可以基于根目录的 `index.html` 开发，或者查看 `dist` 目录下用于生产环境的 `index.html`，Enjoy it!

另外，kityminder-editor 还提供了 bower 包，方便开发者直接使用。你可以在需要用到 kityminder-editor 的工程目录下
运行 `bower install kityminder-editor`，接着手动引入 kityminder-editor 所依赖的 css 和 js 文件，具体文件见
`dist` 目录下的 `index.html`，推荐使用 npm 包 [wireDep](https://www.npmjs.com/package/wiredep) 自动进行，
可参考根目录下 `Gruntfile.js`。

## 构建
运行 `grunt build`，完成后 `dist` 目录里就是可用运行的 kityminder-editor, 双击 `index.html` 即可打开运行示例


## 详情见

[KityMinder Editor Github](https://github.com/fex-team/kityminder-editor)
