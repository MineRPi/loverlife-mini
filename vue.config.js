module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: '',
        ws: true,
        changeOrigin: true,//允许跨域
		pathRewirte:{
			'^/api':''
		}
      }
    }
  }
}