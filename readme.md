# exert uniapp

uniappx vue3 没有setup

## 命令行创建

使用命令行创建要比 HBuilder 多出很多有用的配置。

```bash
# vue3 的使用 vite  js
npx degit dcloudio/uni-preset-vue#vite v3vjsdemo
# ts
npx degit dcloudio/uni-preset-vue#vite-ts v3vtsdemo
```

```bash
# vue2 的要 安装 vue cli
npm install -g @vue/cli
```

## 原生插件开发

uni 文档里 插件名 和 插件 ID 其实是一个东西，不是那个显示名（不是 package.json 里面 name 字段）。
nativePlugins 目录下的文件夹名 必须 和 插件ID 一致。不然不能打包自定义基座。

### keystore

```bat
@rem 
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

## 原生插件使用本地
