module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      // options
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 750, // 设计稿宽度
      unitPrecision: 3, // 转换后的精度
      propList: ["*"], // 指定准换的css的属性的单位，*代表全部css的属性的单位都进行转换
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: [".ignore", "van"], // 指定不转换为视窗单位的类名
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
      landscapeUnit: "vw",
      landscapeWidth: 568, // 用于横向定向的视口宽度
    },
  },
};
