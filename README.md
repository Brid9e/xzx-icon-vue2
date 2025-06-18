# XZX Icon Vue2

基于 Vue2 的内联 SVG 图标组件库，提供 75+ 精美图标。

## ✨ 特性

- 🎯 **Vue2 专用**：完全兼容 Vue2
- 📦 **内联 SVG**：无需额外网络请求，渲染性能优异
- 🎨 **灵活着色**：支持 `color` 和 `fill-color` 独立控制
- 🔧 **自动优化**：自动将 SVG 固定颜色替换为 `currentColor`
- 💾 **体积小巧**：~45KB 压缩后大小
- 🌍 **CDN 友好**：支持 UMD 格式，可直接在浏览器中使用

## 🚀 快速开始

### NPM 安装

```bash
npm install xzx-icon-vue2
```

```javascript
import Vue from 'vue'
import XzxIconVue2 from 'xzx-icon-vue2'

Vue.use(XzxIconVue2)
```

### CDN 使用

```html
<!-- Vue2 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<!-- XZX Icon Vue2 -->
<script src="https://cdn.jsdelivr.net/npm/xzx-icon-vue2/lib/index.umd.min.js"></script>
```

组件会自动注册为全局组件。

## 📖 使用方法

### 基础用法

```vue
<template>
  <div>
    <!-- 基本图标 -->
    <xzx-icon name="camera" size="24"></xzx-icon>

    <!-- 设置颜色 -->
    <xzx-icon name="search" color="#1890ff" size="32"></xzx-icon>
  </div>
</template>
```

### 高级颜色控制

```vue
<template>
  <div>
    <!-- 描边颜色控制 -->
    <xzx-icon name="camera" color="#1890ff" size="32"></xzx-icon>

    <!-- 填充颜色控制 -->
    <xzx-icon name="add-one-filled" fill-color="#52c41a" size="32"></xzx-icon>

    <!-- 同时控制描边和填充 -->
    <xzx-icon name="like" color="#ff4d4f" fill-color="#fff1f0" size="32"></xzx-icon>
  </div>
</template>
```

### CSS 继承颜色

```vue
<template>
  <div style="color: #1890ff;">
    <!-- 图标会自动继承父元素的颜色 -->
    <xzx-icon name="camera" size="24"></xzx-icon>
  </div>
</template>
```

## 🎨 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | String | - | 图标名称（必填） |
| size | String/Number | '1em' | 图标大小 |
| color | String | 'currentColor' | 描边颜色 |
| fill-color | String | null | 填充颜色 |

**注意**：在 HTML 中使用 `fill-color`，在 JavaScript 中对应 `fillColor` 属性。

## 🔧 自动颜色优化

构建过程中会自动优化 SVG 图标：

- **十六进制颜色** (`#000`, `#FF0000`) → `currentColor`
- **RGB/RGBA 颜色** (`rgb(0,0,0)`, `rgba(0,0,0,1)`) → `currentColor`
- **命名颜色** (`black`, `red`) → `currentColor`
- **HSL 颜色** (`hsl(0,0%,0%)`) → `currentColor`

保留以下属性不变：`none`, `inherit`, `currentColor`, `transparent`

## 📊 图标列表

当前提供 75+ 个图标，包括：

- 基础图标：camera, search, like, setting-one 等
- 文件图标：file-code, file-lock-one, file-editing-one 等
- 界面图标：close, add, minus, more 等
- 箭头图标：left, right, up, down 等

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 生成图标文件
npm run generate

# 构建
npm run build

# 测试
npm test
```

## 📄 许可证

MIT License

## 🎯 与旧版本的区别

### v1.1.0+ (内联版本)
- ✅ 无需外部SVG文件
- ✅ 更快的加载速度
- ✅ 更好的缓存策略
- ✅ 避免路径解析问题

### v1.0.x (外部文件版本)
- ❌ 需要加载 `xzx-icon-svg.js` 文件
- ❌ 可能存在路径解析问题
- ❌ 需要处理文件加载失败的情况

## 📊 包大小

- **ES Module**: ~38KB
- **CommonJS**: ~38KB
- **UMD**: ~39KB
- **UMD (压缩)**: ~34KB

## 🔗 相关链接

- [图标源文件](https://www.npmjs.com/package/@xzx-design/icons-svg)
- [Vue.js 官网](https://vuejs.org/)

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

---

**注意**: 本包专为 Vue 2.x 设计，如需 Vue 3 支持，请查看其他相关包。
