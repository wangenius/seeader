const channels = require("../json/channels.json");
const dataStore = require("../json/dataStore.json");
const config = require("../json/appInfo.json");
const settings = require("../json/settings.json");
const style = require("../json/style.json");
/** @Description 类型 */
type Channels = typeof channels;
type DataStore = typeof dataStore;
type Config = typeof config;
type Settings = typeof settings;
type Style = typeof style;

/** @Description CHANNELS */
const Channels: Channels = channels;
const DataStore: DataStore = dataStore;
const Config: Config = config;

const Settings: Settings = settings;
const Style: Style = style;

export { Channels, DataStore, Config, Settings, Style };
