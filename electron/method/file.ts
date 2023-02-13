import fs from "fs/promises";
import jschardet from "jschardet";
import iconvLite from "iconv-lite";
import {checkFileExist} from "../ipc/FileHandler";

export const file = ()=>{}


file.read = async (path:string) => {
    try {
        await checkFileExist(path);
        const fileHandler = await fs.open(path, "r");
        const fileStats = await fs.stat(path);
        const fileContents = Buffer.alloc(fileStats.size);
        await fileHandler.read(fileContents, 0, fileContents.length);
        await fileHandler.close();
        const encoding = jschardet.detect(fileContents).encoding;
        if (encoding !== "UTF-8") return iconvLite.decode(fileContents, "gbk");
return fileContents.toString();
} catch (e) {
    throw e;
}
}