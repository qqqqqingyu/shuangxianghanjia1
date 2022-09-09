module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',

    devServer: {
        proxy: {
            '/api': {
                target: 'http://47.108.189.227:8000', // 对应后台服务地址
                //target: 'http://127.0.0.1:8081', // 原有的对应后台服务地址
                // target: 'http://10.8.28.164', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite:{
                    "^/api" : "/"
                }
            }
        }
    },

    publicPath: './',
};
