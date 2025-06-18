# xzx-icon-vue2

Vue2 图标组件库，支持内联SVG，无需外部文件。基于 `@xzx-design/icons-svg` 包中的70+个精美图标。

## ✨ 特性

- 🚀 **内联SVG** - 所有图标直接内嵌在组件中，无需加载外部文件
- 📦 **轻量级** - 只包含必要的图标数据
- 🎨 **可定制** - 支持自定义尺寸和颜色
- 🔧 **易使用** - 简单的API，支持多种安装方式
- 📱 **响应式** - 支持不同尺寸的图标显示
- 🌐 **CDN友好** - 支持CDN引入，自动安装

## 📦 安装

```bash
npm install xzx-icon-vue2
```

## 🚀 使用方法

### 方式1: 全局注册 (推荐)

```javascript
import Vue from 'vue'
import XzxIcon from 'xzx-icon-vue2'

Vue.use(XzxIcon)

// 现在可以在任何组件中使用
// <xzx-icon name="camera" size="24" color="#1890ff"></xzx-icon>
```

### 方式2: 按需引入

```javascript
import { XzxIcon } from 'xzx-icon-vue2'

export default {
  components: {
    XzxIcon
  }
}
```

### 方式3: CDN引入

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/xzx-icon-vue2/lib/index.umd.js"></script>
</head>
<body>
  <div id="app">
    <xzx-icon name="camera" size="32" color="#1890ff"></xzx-icon>
  </div>

  <script>
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>
```

## 📖 组件API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 图标名称 | `string` | - |
| size | 图标尺寸 | `string \| number` | `'1em'` |
| color | 图标颜色 | `string` | `'currentColor'` |

### 示例

```vue
<template>
  <div>
    <!-- 基本使用 -->
    <xzx-icon name="camera"></xzx-icon>

    <!-- 自定义尺寸 -->
    <xzx-icon name="like" size="32"></xzx-icon>
    <xzx-icon name="search" size="1.5em"></xzx-icon>

    <!-- 自定义颜色 -->
    <xzx-icon name="heart" color="#ff4d4f"></xzx-icon>
    <xzx-icon name="star" color="rgb(24, 144, 255)"></xzx-icon>

    <!-- 在按钮中使用 -->
    <button>
      <xzx-icon name="upload" size="16"></xzx-icon>
      上传文件
    </button>
  </div>
</template>
```

## 🎨 可用图标

本库包含70+个图标，包括：

- **基础图标**: `camera`, `search`, `upload`, `download`, `delete`, `edit`
- **导航图标**: `left`, `right`, `up`, `down`, `close`, `more`
- **状态图标**: `check`, `error`, `warning`, `info`, `loading`
- **社交图标**: `like`, `share`, `comment`, `star`
- **文件图标**: `file`, `folder`, `image`, `video`, `audio`
- **业务图标**: `user`, `setting`, `home`, `mail`, `phone`

### 获取所有图标名称

```javascript
import { getIconNames } from 'xzx-icon-vue2'

const allIcons = getIconNames()
console.log(allIcons) // ['camera', 'search', 'upload', ...]
```

## 🔧 高级用法

### 自定义组件名称

```javascript
Vue.use(XzxIcon, {
  componentName: 'MyIcon' // 默认是 'XzxIcon'
})

// 使用
// <my-icon name="camera"></my-icon>
```

### 访问图标数据

```javascript
import { iconData } from 'xzx-icon-vue2'

console.log(iconData['camera'])
// { viewBox: "0 0 48 48", content: "<path...>" }
```

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

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

---

**注意**: 本包专为 Vue 2.x 设计，如需 Vue 3 支持，请查看其他相关包。
