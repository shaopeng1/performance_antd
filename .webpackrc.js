const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  proxy:{
    '/api':{
      target:'http://127.0.0.1:8080/gsonin',
      changeOrigin : true,
      pathRewrite :{'^/gsonin/api':''}
    }
  },
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  /*theme: {
     "primary-color": "#7546c9",
   },*/
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
