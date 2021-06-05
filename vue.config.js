const path = require('path')
function resolve (dir) {
	return path.join(__dirname, dir)
}

const port = process.env.port || 8080

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
	}
}