import { Path } from "./lib/path";
import { Config, Channels, DataStore, Settings, Style } from "./lib/info";
export type Query = {
    [key: string]: any;
};
export type RemoveOptions = {
    multi?: boolean;
};
export type Projection<TSchema> = {
    [p in keyof TSchema]?: number;
};
export { DataStore, Config, Channels, Settings, Style, Path };
