"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dir_dataStores = exports.Dir_statics = exports.Dir_asar = exports.Dir_root = void 0;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const root_packaged = __dirname.slice(0, __dirname.indexOf("resources") - 1);
const root_dev = __dirname.slice(0, __dirname.indexOf("end") - 1);
class Path {
    constructor(path) {
        this.path = path;
    }
    exit() {
        return new Path(this.path.slice(0, this.path.lastIndexOf("\\")));
    }
    enter(...props) {
        return new Path(path_1.default.join(this.path, ...props));
    }
    end(...props) {
        return path_1.default.join(this.path, ...props);
    }
}
/** @Description 项目根目录 */
exports.Dir_root = new Path(electron_1.app.isPackaged ? root_packaged : root_dev);
/** @Description 资源文件 含有build静态文件和end后端文件和node modules文件 */
exports.Dir_asar = electron_1.app.isPackaged
    ? exports.Dir_root.enter("resources").enter("app.asar")
    : exports.Dir_root;
/** 静态文件目录*/
exports.Dir_statics = exports.Dir_asar.enter("build");
/** 数据库目录*/
exports.Dir_dataStores = exports.Dir_root.enter("resources").enter("data");
