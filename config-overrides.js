const {
  addWebpackModuleRule,
  override,
  addWebpackAlias, removeModuleScopePlugin,
} = require("customize-cra");
const path = require("path");
if (process.env.NODE_ENV === "production") {
  process.env.GENERATE_SOURCEMAP = "false";
}
module.exports = {
  webpack: override(
    addWebpackModuleRule({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: path.resolve(__dirname, './src/svg') // 只带自己人玩
    }),
    addWebpackModuleRule({
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "/[path][name].[hash:7].[ext]",
          },
        },
      ],
    }),
    removeModuleScopePlugin(),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    })
  ),
};
