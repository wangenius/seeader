"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipc_win = void 0;
const Windows_1 = require("./Windows");
const constant_1 = require("../@constant/constant");
function ipc_win() {
    (0, constant_1.handle)("window_toggleDevTools", Windows_1.window_toggleDevTools);
    (0, constant_1.handle)("window_min", Windows_1.window_min);
    (0, constant_1.handle)("window_max", Windows_1.window_max);
    (0, constant_1.handle)("window_new", Windows_1.window_new);
    (0, constant_1.handle)("window_resize", Windows_1.window_resize);
    (0, constant_1.handle)("window_close", Windows_1.window_close);
    (0, constant_1.handle)("app_close", Windows_1.app_close);
}
exports.ipc_win = ipc_win;
