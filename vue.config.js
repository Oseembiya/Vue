module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Vue/" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option, template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "School Activities - ParentPay",
    },
  },
  // CSS configuration
  css: {
    loaderOptions: {
      css: {
        // Configure global CSS settings as needed
      },
    },
  },
  // Configure webpack if needed
  configureWebpack: {
    // Configuration goes here
  },
};
