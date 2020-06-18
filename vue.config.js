module.exports = {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" , "Access-Control-Allow-Credentials": "true" },      
      host: 'localhost',
      port: 8081, 
      https: true,
      hotOnly: false,
    },
  }