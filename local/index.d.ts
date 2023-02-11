export * from "./lib/dest";
export * from "./lib/info";
export type Query = {
    [key: string]: any;
};
export type RemoveOptions = {
    multi?: boolean;
};
export type Projection<TSchema> = {
    [p in keyof TSchema]?: number;
};
