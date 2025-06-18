# XZX Icon Vue2

Vue2图标组件库，支持自动注入SVG图标文件。

## 特性

- 🎨 丰富的图标库
- 🚀 自动注入SVG图标文件
- 📦 支持多种引入方式
- 🎯 基于Vue2开发
- 💡 易于使用和扩展

## 安装

```bash
npm install xzx-icon-vue2
```

## 使用方法

### 1. 全局注册（推荐）

```javascript
import Vue from 'vue'
import XzxIcon from 'xzx-icon-vue2'

// 全局注册，会自动注入SVG图标文件
Vue.use(XzxIcon)

// 可以自定义组件名和SVG文件路径
Vue.use(XzxIcon, {
  componentName: 'MyIcon', // 默认为 'XzxIcon'
  svgPath: '/path/to/your/xzx-icon-svg.js' // 可选，自定义SVG文件路径
})
```

### 2. 局部注册

```javascript
import { XzxIcon } from 'xzx-icon-vue2'

export default {
  components: {
    XzxIcon
  }
}
```

### 3. CDN引入

```html
<!-- Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

<!-- XZX Icon Vue2 -->
<script src="https://unpkg.com/xzx-icon-vue2/lib/index.umd.min.js"></script>

<!-- 图标会自动注册为全局组件 -->
```

## 组件API

### Props

| 参数  | 说明     | 类型           | 默认值        |
|-------|----------|----------------|---------------|
| name  | 图标名称 | String         | -             |
| size  | 图标大小 | String/Number  | '16'          |
| color | 图标颜色 | String         | 'currentColor'|

### 示例

```vue
<template>
  <div>
    <!-- 基本用法 -->
    <xzx-icon name="left"></xzx-icon>

    <!-- 设置大小 -->
    <xzx-icon name="right" size="24"></xzx-icon>

    <!-- 设置颜色 -->
    <xzx-icon name="like" color="#ff4757"></xzx-icon>

    <!-- 组合使用 -->
    <xzx-icon name="camera" size="32" color="#3742fa"></xzx-icon>
  </div>
</template>
```

## 可用图标

组件库包含以下图标：

- `all-application` - 应用图标
- `left` - 左箭头
- `right` - 右箭头
- `more` - 更多
- `camera` - 相机
- `like` - 喜欢
- `preview-open` - 预览打开
- `preview-close-one` - 预览关闭
- `refresh` - 刷新
- `setting-one` - 设置
- `search` - 搜索
- `close` - 关闭
- `delete` - 删除
- `download` - 下载
- `upload` - 上传
- ... 更多图标

## 高级用法

### 手动加载SVG图标

如果你需要手动控制SVG图标的加载时机：

```javascript
import { loadSvgIcons } from 'xzx-icon-vue2'

// 手动加载SVG图标
loadSvgIcons('/path/to/your/xzx-icon-svg.js')
  .then(() => {
    console.log('SVG图标加载成功')
  })
  .catch(error => {
    console.error('SVG图标加载失败:', error)
  })
```

### 自定义SVG文件路径

```javascript
Vue.use(XzxIcon, {
  svgPath: 'https://your-cdn.com/xzx-icon-svg.js'
})
```

## 工作原理

1. 当你调用 `Vue.use(XzxIcon)` 时，插件会自动在页面的 `<head>` 中添加一个 `<script>` 标签
2. 这个 `<script>` 标签会加载 `xzx-icon-svg.js` 文件
3. `xzx-icon-svg.js` 文件包含所有的SVG图标定义，会自动注入到页面中
4. 图标组件通过 `<use>` 标签引用这些SVG定义

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发模式
npm run build:dev
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request。
