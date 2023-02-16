import { Fima } from "./file";
import { path_config_settings } from "../@constant/path";

export abstract class Settings {
  static save(query) {
    return Fima.write_json(path_config_settings, query, true);
  }

  static export(path: string) {
    return Fima.copy(path_config_settings, path);
  }
}
