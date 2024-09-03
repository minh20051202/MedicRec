const path = require("path");

module.exports = {
  entry: "./public/scripts.js", // Your main JavaScript file
  output: {
    filename: "bundle.js", // Output bundle file
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
