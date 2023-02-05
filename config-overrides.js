const { addWebpackModuleRule, override } = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackModuleRule({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
  ),
};
