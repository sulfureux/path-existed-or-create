var fs = require("fs");
var p = require("path");
var compareVersions = require("compare-versions");

function pathExistedOrCreate(path) {
  var nPath = p.resolve(path);
  try {
    fs.accessSync(nPath, fs.F_OK);
  } catch (e) {
    fs.mkdirSync(nPath, { recursive: true });
  }
}

function pathExistedOrCreateSupportNodeVersionLesser10(path) {
  var nPath = p.resolve(path);
  var paths = nPath.split("/");
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
