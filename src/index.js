// 图标组件
const XzxIcon = {
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
    }
  },
  render(h) {
    return h('svg', {
      attrs: {
        class: 'xzx-icon',
        width: this.size,
        height: this.size,
        'aria-hidden': true
      },
      style: {
        verticalAlign: 'middle',
        fill: this.color,
        color: this.color
      }
    }, [
      h('use', {
        attrs: {
          'href': `#${this.name}`
        }
      })
    ])
  }
}

// 自动注入SVG图标脚本
function injectSvgScript(options = {}) {
  // 检查是否已经注入过
  if (document.querySelector('script[data-xzx-icon-svg]')) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    // 创建script标签
    const script = document.createElement('script')

    let svgScriptSrc = options.svgPath

    if (!svgScriptSrc) {
      // 尝试不同的路径策略
      const possiblePaths = [
        // 相对于当前页面的路径
        './xzx-icon-svg.js',
        // 相对于node_modules的路径
        './node_modules/xzx-icon-vue2/xzx-icon-svg.js',
        // CDN路径（可以根据需要配置）
        'https://unpkg.com/xzx-icon-vue2/xzx-icon-svg.js'
      ]

      // 如果有当前脚本信息，优先使用相对路径
      const currentScript = document.currentScript ||
        (function() {
          const scripts = document.getElementsByTagName('script')
          return scripts[scripts.length - 1]
        })()

      if (currentScript && currentScript.src) {
        const basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'))
        svgScriptSrc = `${basePath}/xzx-icon-svg.js`
      } else {
        svgScriptSrc = possiblePaths[0]
      }
    }

    script.src = svgScriptSrc
    script.setAttribute('data-xzx-icon-svg', 'true')
    script.async = true

    script.onload = () => {
      console.log('xzx-icon-svg.js loaded successfully')
      resolve()
    }

    script.onerror = (error) => {
      console.warn(`Failed to load xzx-icon-svg.js from ${svgScriptSrc}`)

      // 如果是默认路径失败，尝试其他路径
      if (!options.svgPath && svgScriptSrc !== 'https://unpkg.com/xzx-icon-vue2/xzx-icon-svg.js') {
        // 移除失败的script标签
        script.remove()

        // 尝试CDN路径
        injectSvgScript({ svgPath: 'https://unpkg.com/xzx-icon-vue2/xzx-icon-svg.js' })
          .then(resolve)
          .catch(reject)
      } else {
        reject(error)
      }
    }

    // 添加到head
    document.head.appendChild(script)
  })
}

// 安装函数
function install(Vue, options = {}) {
  // 注入SVG脚本
  if (typeof window !== 'undefined') {
    const injectScript = () => {
      injectSvgScript(options).catch(error => {
        console.error('Failed to load SVG icons:', error)
        console.warn('Icons may not display correctly. Please ensure xzx-icon-svg.js is accessible.')
      })
    }

    // 延迟执行，确保DOM已准备好
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectScript)
    } else {
      // 使用setTimeout确保在Vue实例化后执行
      setTimeout(injectScript, 0)
    }
  }

  // 注册全局组件
  Vue.component(options.componentName || 'XzxIcon', XzxIcon)
}

// 手动注入SVG的方法（供用户手动调用）
function loadSvgIcons(svgPath) {
  if (typeof window === 'undefined') {
    console.warn('loadSvgIcons can only be called in browser environment')
    return Promise.resolve()
  }

  return injectSvgScript({ svgPath })
}

// 支持CDN引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  XzxIcon,
  loadSvgIcons
}

export { XzxIcon, loadSvgIcons }
