var fs = require("fs");
var compareVersions = require('compare-versions');

function pathExistedOrCreate(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function pathExistedOrCreateSupportNodeVersionLesser10(path) {
  var paths = path.split("/");
  var length = paths.length;
  var currentPath = "";

  for (var i = 0; i < length; i++) {
    currentPath = `${currentPath}/${paths[i]}`;
    try {
      fs.accessSync(currentPath, fs.F_OK);
    } catch (e) {
      fs.mkdirSync(currentPath);
    }
  }
}

var exportFn = pathExistedOrCreate;

if (compareVersions("v10.12.0", process.version) >= 0) {
  exportFn = pathExistedOrCreateSupportNodeVersionLesser10;
}

module.exports = exportFn;
