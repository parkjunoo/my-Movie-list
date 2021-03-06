
module.exports = { 
  lintOnSave: false,
  outputDir: '../backend/public', 
  
  devServer: { 
    proxy: { 
      '/api': { 
        target: 'http://localhost:3000/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
}

