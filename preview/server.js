const express = require('express')
const path = require('path')
const open = require('open')
const fs = require('fs')

const app = express()
const PORT = 3005

// 静态文件服务
app.use(express.static(path.join(__dirname)))
app.use('/lib', express.static(path.join(__dirname, '../lib')))
app.use('/src', express.static(path.join(__dirname, '../src')))

// 主页面路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// API: 获取所有图标列表
app.get('/api/icons', (req, res) => {
  try {
    // 读取内联图标文件内容
    const iconFilePath = path.join(__dirname, '../src/inline-icons.js')
    const iconFileContent = fs.readFileSync(iconFilePath, 'utf-8')

    // 提取iconData对象
    const iconDataMatch = iconFileContent.match(/export const iconData = (\{[\s\S]*?\n\})/)
    if (!iconDataMatch) {
      throw new Error('无法解析iconData')
    }

    // 使用eval来解析JSON对象 (注意：这只在服务器端安全)
    const iconDataStr = iconDataMatch[1]
    const iconData = eval('(' + iconDataStr + ')')
    const icons = Object.keys(iconData)

    res.json({ icons, count: icons.length })
    console.log(`✅ 成功加载 ${icons.length} 个图标`)
  } catch (error) {
    console.error('获取图标列表失败:', error.message)
    res.status(500).json({ error: '获取图标列表失败: ' + error.message })
  }
})

app.get('/simple', (req, res) => {
  const simplePage = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>简化图标预览</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .icons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; }
    .icon-item { text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; }
    .icon-item:hover { background: #f5f5f5; }
    .icon-display { margin-bottom: 8px; }
    .icon-name { font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div id="app">
    <h1>图标预览 ({{ filteredIcons.length }})</h1>
    <input v-model="searchQuery" placeholder="搜索..." @input="filterIcons" style="width: 100%; padding: 8px; margin-bottom: 20px;">

    <div class="icons-grid">
      <div class="icon-item" v-for="iconName in filteredIcons" :key="iconName" @click="copy(iconName)">
        <div class="icon-display">
          <xzx-icon :name="iconName" size="32"></xzx-icon>
        </div>
        <div class="icon-name">{{ iconName }}</div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script src="/lib/index.umd.js"></script>
  <script>
    if (window.XzxIconVue2) {
      if (window.XzxIconVue2.default) {
        Vue.use(window.XzxIconVue2.default)
        console.log('✅ 注册组件成功')
      } else {
        Vue.use(window.XzxIconVue2)
        console.log('✅ 注册组件成功')
      }
    }

    new Vue({
      el: '#app',
      data: {
        allIcons: [],
        filteredIcons: [],
        searchQuery: ''
      },
      async mounted() {
        const response = await fetch('/api/icons')
        const data = await response.json()
        this.allIcons = data.icons || []
        this.filteredIcons = [...this.allIcons]
        console.log('加载图标:', this.allIcons.length)
      },
      methods: {
        filterIcons() {
          this.filteredIcons = this.searchQuery
            ? this.allIcons.filter(icon => icon.includes(this.searchQuery.toLowerCase()))
            : [...this.allIcons]
        },
        copy(name) {
          navigator.clipboard.writeText(name)
          console.log('复制:', name)
        }
      }
    })
  </script>
</body>
</html>`
  res.send(simplePage)
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`
🎉 图标预览服务器已启动！

📍 本地地址: http://localhost:${PORT}
🌐 自动打开浏览器中...

按 Ctrl+C 停止服务器
`)

  // 自动打开浏览器
  open(`http://localhost:${PORT}`).catch(() => {
    console.log('💡 请手动打开浏览器访问: http://localhost:' + PORT)
  })
})

// 错误处理
app.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用，请先关闭其他服务或稍后重试`)
  } else {
    console.error('❌ 服务器启动失败:', err.message)
  }
  process.exit(1)
})
