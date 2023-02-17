import { Fima } from "../main/file";
import { FILE_PATHS } from "../@constant/path";
import { mass } from "../ipc";
import { App } from "./app";
import {Detector} from "../main/generator";

export abstract class Settings {
  static async save(query): Reply {
    await Fima.write_json(FILE_PATHS.config.settings, query, true, true);
    return mass("保存成功");
  }

  static async export(): Reply {
    const filePath = await App.save("json", "json", "保存配置文件到");
    if (Detector.ud(filePath)) return mass.cancel()
    await Fima.copy(FILE_PATHS.config.settings, filePath);
    return mass("保存成功");
  }
}
