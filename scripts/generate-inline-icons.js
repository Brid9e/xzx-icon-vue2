const fs = require('fs')
const path = require('path')

// SVG图标目录
const iconsDir = path.join(__dirname, '../node_modules/@xzx-design/icons-svg')
const outputFile = path.join(__dirname, '../src/inline-icons.js')

// 读取所有SVG文件
function generateInlineIcons() {
  const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))

  const icons = {}
  let optimizedCount = 0

  files.forEach((file) => {
    const iconName = path.basename(file, '.svg')
    const svgContent = fs.readFileSync(path.join(iconsDir, file), 'utf-8')

    // 提取SVG内容（去掉外层svg标签，只保留内部path等元素）
    const match = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s)
    if (match) {
      let innerContent = match[1].trim()
      const originalContent = innerContent

      // 自动替换颜色属性为currentColor
      // 替换各种格式的黑色为 currentColor
      innerContent = innerContent.replace(/stroke="#0{3,6}"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/fill="#0{3,6}"/g, 'fill="currentColor"')

      // 替换其他十六进制颜色为currentColor
      innerContent = innerContent.replace(/stroke="#[a-fA-F0-9]{6}"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/stroke="#[a-fA-F0-9]{3}"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/fill="#[a-fA-F0-9]{6}"/g, 'fill="currentColor"')
      innerContent = innerContent.replace(/fill="#[a-fA-F0-9]{3}"/g, 'fill="currentColor"')

      // 替换 RGB/RGBA 颜色
      innerContent = innerContent.replace(/stroke="rgb\([^)]+\)"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/fill="rgb\([^)]+\)"/g, 'fill="currentColor"')
      innerContent = innerContent.replace(/stroke="rgba\([^)]+\)"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/fill="rgba\([^)]+\)"/g, 'fill="currentColor"')

      // 替换命名颜色 (除了none, inherit, currentColor)
      innerContent = innerContent.replace(/stroke="(?!none|inherit|currentColor|transparent)[a-zA-Z]+"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/fill="(?!none|inherit|currentColor|transparent)[a-zA-Z]+"/g, 'fill="currentColor"')

      // 处理 HSL 颜色
      innerContent = innerContent.replace(/stroke="hsl\([^)]+\)"/g, 'stroke="currentColor"')
      innerContent = innerContent.replace(/fill="hsl\([^)]+\)"/g, 'fill="currentColor"')

      // 统计优化数量
      if (originalContent !== innerContent) {
        optimizedCount++
      }

      // 提取viewBox
      const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/)
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 48 48'

      icons[iconName] = {
        viewBox,
        content: innerContent
      }
    }
  })

  // 生成JavaScript文件
  const output = `// 自动生成的内联图标文件
// 来源: @xzx-design/icons-svg

export const iconData = ${JSON.stringify(icons, null, 2)}

// 内联图标组件
export const XzxIcon = {
  name: 'XzxIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: '1em'
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    fillColor: {
      type: String,
      default: null
    }
  },
  render(h) {
    const icon = iconData[this.name]
    if (!icon) {
      console.warn(\`Icon "\${this.name}" not found\`)
      return null
    }

    // 构建样式对象
    const svgStyle = {
      verticalAlign: 'middle',
      display: 'inline-block'
    }

    // 设置颜色 - 优先使用color作为整体颜色
    if (this.color) {
      svgStyle.color = this.color
    }

    return h('svg', {
      attrs: {
        class: 'xzx-icon',
        width: this.size,
        height: this.size,
        viewBox: icon.viewBox,
        fill: this.fillColor || 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': true
      },
      style: svgStyle,
      domProps: {
        innerHTML: icon.content
      }
    })
  }
}

// 安装函数
export function install(Vue, options = {}) {
  Vue.component(options.componentName || 'XzxIcon', XzxIcon)
}

// 默认导出
export default {
  install,
  XzxIcon,
  iconData
}

// 获取所有图标名称
export function getIconNames() {
  return Object.keys(iconData)
}
`

  fs.writeFileSync(outputFile, output, 'utf-8')
  console.log(`✅ 生成内联图标文件: ${outputFile}`)
  console.log(`📊 共处理 ${files.length} 个图标，其中 ${optimizedCount} 个图标被优化`)
}

generateInlineIcons()
