"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = exports.Dest = void 0;
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
/** @Description  生成路径对象 */
class Dest {
    constructor(path) {
        this.path = path;
    }
    exit() {
        return new Dest(this.path.slice(0, this.path.lastIndexOf("\\")));
    }
    enter(...props) {
        return new Dest(path_1.default.join(this.path, ...props));
    }
    end(...props) {
        return path_1.default.join(this.path, ...props);
    }
}
exports.Dest = Dest;
class Path {
    static parser(path) {
        const array = lodash_1.default.last(path.split(/\\/g)) || path;
        const name = array.slice(0, array.lastIndexOf("."));
        const ext = array.slice(array.lastIndexOf("."), array.length);
        return { array: array, name: name, ext: ext };
    }
    static join(path, ...props) {
        let res = path;
        props.map((item) => {
            res = res + `\\${item}`;
        });
        return res;
    }
}
exports.Path = Path;
