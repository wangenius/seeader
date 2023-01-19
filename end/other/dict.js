"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dict_search = void 0;
const js_mdict_1 = __importDefault(require("js-mdict"));
const path_1 = require("../@constant/path");
/** @Description 词典搜索 */
const dict_search = (event, target) => {
    const dict = new js_mdict_1.default(path_1.Dir_statics.enter("mdx").end("zh.mdx"));
    return dict.lookup(target);
};
exports.dict_search = dict_search;
