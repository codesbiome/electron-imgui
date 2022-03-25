const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@assets': 'assets',
  '@src': 'src',
  '@misc': 'misc',
  'imgui-js': 'misc/imgui-js/dist/imgui.umd.js', // Used by ImGui_Impl
});
