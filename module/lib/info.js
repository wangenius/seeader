"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = exports.Settings = exports.Config = exports.DataStore = exports.Channels = void 0;
var channels = require("../json/channels.json");
var dataStore = require("../json/dataStore.json");
var config = require("../json/appInfo.json");
var settings = require("../json/settings.json");
var style = require("../json/style.json");
/** @Description CHANNELS */
var Channels = channels;
exports.Channels = Channels;
var DataStore = dataStore;
exports.DataStore = DataStore;
var Config = config;
exports.Config = Config;
var Settings = settings;
exports.Settings = Settings;
var Style = style;
exports.Style = Style;
