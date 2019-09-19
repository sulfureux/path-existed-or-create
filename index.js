const fs = require("fs");

function pathExistedOrCreate(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    fs.mkdirSync(path, { recursive: true });
  }
}

module.exports = pathExistedOrCreate;
