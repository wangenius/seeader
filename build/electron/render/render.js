"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
var fs = require("fs");
function readFile(path) {
    fs.readFile(path, function (err, data) {
        console.log("read success");
    });
}
exports.readFile = readFile;
//# sourceMappingURL=render.js.map