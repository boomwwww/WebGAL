import { fileType } from "./config";
import type { ConfigMap, ConfigItem, IAsset, WebgalConfig, IWebGALStyleObj } from "./types";

export class SceneParser {
  private readonly assetsPrefetcher: (assetList: IAsset[]) => void;
  private readonly assetSetter: (fileName: string, assetType: fileType) => string;
  private readonly ADD_NEXT_ARG_LIST: number[];
  private readonly SCRIPT_CONFIG_MAP: ConfigMap;
  constructor(
    assetsPrefetcher: (assetList: IAsset[]) => void,
    assetSetter: (fileName: string, assetType: fileType) => string,
    ADD_NEXT_ARG_LIST: number[],
    SCRIPT_CONFIG_INPUT: ConfigItem[] | ConfigMap,
  ) {
    this.assetsPrefetcher = assetsPrefetcher;
    this.assetSetter = assetSetter;
    this.ADD_NEXT_ARG_LIST = ADD_NEXT_ARG_LIST;
    if (Array.isArray(SCRIPT_CONFIG_INPUT)) {
      this.SCRIPT_CONFIG_MAP = new Map();
      SCRIPT_CONFIG_INPUT.forEach((config) => {
        this.SCRIPT_CONFIG_MAP.set(config.scriptString, config);
      });
    } else {
      this.SCRIPT_CONFIG_MAP = SCRIPT_CONFIG_INPUT;
    }
  }
  /**
   * 解析场景
   * @param rawScene 原始场景
   * @param sceneName 场景名称
   * @param sceneUrl 场景url
   * @return 解析后的场景
   */
  parse(rawScene: string, sceneName: string, sceneUrl: string) {
    return sceneParser(
      rawScene,
      sceneName,
      sceneUrl,
      this.assetsPrefetcher,
      this.assetSetter,
      this.ADD_NEXT_ARG_LIST,
      this.SCRIPT_CONFIG_MAP,
    );
  }

  parseConfig(configText: string) {
    return configParser(configText);
  }

  stringifyConfig(config: WebgalConfig) {
    return config.reduce(
      (previousValue, curr) =>
        previousValue +
        `${curr.command}:${curr.args.join("|")}${
          curr.options.length <= 0 ? "" : curr.options.reduce((p, c) => p + " -" + c.key + "=" + c.value, "")
        };\n`,
      "",
    );
  }

  parseScssToWebgalStyleObj(scssString: string): IWebGALStyleObj {
    return scss2cssinjsParser(scssString);
  }
}
