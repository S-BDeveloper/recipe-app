// batch-rename-to-ts.js
const fs = require("fs");
const path = require("path");

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const exts = [
  { from: ".jsx", to: ".tsx" },
  { from: ".js", to: ".ts" },
];

walk(path.join(__dirname, "../src"), function (filePath) {
  exts.forEach(({ from, to }) => {
    if (filePath.endsWith(from)) {
      const newPath = filePath.slice(0, -from.length) + to;
      fs.renameSync(filePath, newPath);
      console.log(`Renamed: ${filePath} -> ${newPath}`);
    }
  });
});
