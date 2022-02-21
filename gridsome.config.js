const tailwindcss = require("tailwindcss");

module.exports = {
  siteName: "Flat Iron Cyber",
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [tailwindcss]
      }
    }
  }
};
