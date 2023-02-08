"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
var path_1 = __importDefault(require("path"));
/** @Description  生成路径对象 */
var Path = /** @class */ (function () {
    function Path(path) {
        this.path = path;
    }
    Path.prototype.exit = function () {
        return new Path(this.path.slice(0, this.path.lastIndexOf("\\")));
    };
    Path.prototype.enter = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return new Path(path_1.default.join.apply(path_1.default, __spreadArray([this.path], props, false)));
    };
    Path.prototype.end = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return path_1.default.join.apply(path_1.default, __spreadArray([this.path], props, false));
    };
    return Path;
}());
exports.Path = Path;
