#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

const command = process.argv[2]

if (command === 'preview') {
  console.log('🚀 启动图标预览服务器...')

  const serverPath = path.join(__dirname, '../preview/server.js')
  const child = spawn('node', [serverPath], {
    stdio: 'inherit',
    cwd: process.cwd()
  })

  child.on('error', (err) => {
    console.error('❌ 启动预览服务器失败:', err.message)
    process.exit(1)
  })

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ 预览服务器退出，代码: ${code}`)
      process.exit(code)
    }
  })

  // 优雅关闭
  process.on('SIGINT', () => {
    console.log('\n👋 关闭预览服务器...')
    child.kill('SIGINT')
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    child.kill('SIGTERM')
    process.exit(0)
  })

} else {
  console.log(`
🎨 XZX Icon Vue2 CLI

用法:
  xzx-icon-vue2 preview    启动图标预览服务器

选项:
  -h, --help              显示帮助信息
  -v, --version           显示版本信息
`)

  if (command === '-v' || command === '--version') {
    const packageJson = require('../package.json')
    console.log(packageJson.version)
  }
}
