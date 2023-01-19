"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shell_open = exports.file_copy_force = exports.file_copy = exports.file_read = exports.file_write = exports.isExist = exports.checkFileExist = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const jschardet_1 = __importDefault(require("jschardet"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const electron_1 = require("electron");
const path_2 = require("../@constant/path");
function checkFileExist(path) {
    return promises_1.default.access(path, promises_1.default.constants.F_OK);
}
exports.checkFileExist = checkFileExist;
function isExist(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(path, promises_1.default.constants.F_OK);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
exports.isExist = isExist;
const file_write = (event, path, content) => promises_1.default.writeFile(path, content);
exports.file_write = file_write;
const file_read = (event, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkFileExist(path);
        const fileHandler = yield promises_1.default.open(path, "r");
        const fileStats = yield promises_1.default.stat(path);
        const fileContents = Buffer.alloc(fileStats.size);
        yield fileHandler.read(fileContents, 0, fileContents.length);
        yield fileHandler.close();
        const encoding = jschardet_1.default.detect(fileContents).encoding;
        if (encoding !== "UTF-8")
            return iconv_lite_1.default.decode(fileContents, "gbk");
        return fileContents.toString();
    }
    catch (e) {
        throw e;
    }
});
exports.file_read = file_read;
const file_copy = (event, src, dest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return ((yield isExist(path_1.default.join(__dirname, "..", "..", "public", dest))) ||
            (yield promises_1.default
                .copyFile(src, path_1.default.join(__dirname, "..", "..", "public", dest))
                .then((res) => path_1.default.join(__dirname, "..", "..", "public", dest))));
    }
    catch (_a) { }
});
exports.file_copy = file_copy;
const file_copy_force = (event, src, dest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default
            .copyFile(src, path_1.default.join(__dirname, "..", "..", "public", dest), fs_1.constants.COPYFILE_FICLONE)
            .then((res) => path_1.default.join(__dirname, "..", "..", "public", dest));
    }
    catch (_b) { }
});
exports.file_copy_force = file_copy_force;
const shell_open = (event, filePath) => {
    return electron_1.shell.openPath(path_2.Dir_root.end(filePath));
};
exports.shell_open = shell_open;
