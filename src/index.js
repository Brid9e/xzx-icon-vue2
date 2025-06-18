// 使用内联图标版本，不再需要外部JS文件
import { XzxIcon, install, iconData, getIconNames } from './inline-icons.js'

// 导出组件和相关功能
export { XzxIcon, iconData, getIconNames }

// 默认导出安装函数
export default {
  install,
  XzxIcon,
  iconData,
  getIconNames
}

// 支持CDN引入 - 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
