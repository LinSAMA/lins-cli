const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  lintOnSave:false,
  chainWebpack: (config) => {
    console.log(config);
    // 生产环境
    if (process.env.VUE_APP_ENV === "prod") {
      // 图片压缩
      config.module
        .rule("images")
        .test(/(?<!\.apng)\.(gif|png|jpe?g|svg)$/i)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        })
        .end();
    }
  },
});
