export * from "./lib";
export type Query = {
    [key: string]: any;
};
export type RemoveOptions = {
    multi?: boolean;
};
export type Projection<TSchema> = {
    [p in keyof TSchema]?: number;
};
