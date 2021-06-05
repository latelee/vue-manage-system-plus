const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve (dir) {
	return path.join(__dirname, dir)
}

const port = defaultSettings.port || 8080
const name = defaultSettings.webtitle || '后台管理系统-默认'

module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	devServer: {
		overlay: { // eslint校验开启
			warnings: false,
			errors: false
		},
		open: true,
		host: 'localhost',
		port: port,
		proxy: {
			'/api': { // 这里最好有一个 /
				target: process.env.VUE_APP_URL, // 参数.env开头的文件
				ws: false, // 如果要代理 websockets，配置这个参数
				changeOrigin: true, // 是否跨域
				pathRewrite: {
					'^$/api': ''
				}
			}
		}
	},
	// 暂不知何用
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
		  alias: {
			'@': resolve('src')
		  }
		}
	  },
}