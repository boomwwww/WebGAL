import {
  type ParserConfig,
  type CompleteParserConfig,
  type PluginParse,
  type PluginParserLike,
  defaultParserConfig,
  type Scene,
  type Sentence,
} from "./config";
import { createCommonParser } from "./commonParser";

export type Parser = {
  parse: (rawScene: { name: string; url: string; str: string }) => Scene;
  stringify: (input: Scene | Array<Sentence>, options?: unknown) => string;
  commonParse: (str: string) => Array<Sentence>;
  plugins: Record<string, PluginParse>;
};

const getMergedConfig = (userConfig?: ParserConfig): CompleteParserConfig => {
  const merged = { ...defaultParserConfig };
  if (!userConfig) return merged;
  if (userConfig.commonParserConfig) {
    merged.commonParserConfig = { ...merged.commonParserConfig, ...userConfig.commonParserConfig };
  }
  if (userConfig.plugins) {
    merged.plugins = [...merged.plugins, ...userConfig.plugins];
  }
  if (userConfig.pluginParsers) {
    merged.pluginParsers = [...merged.pluginParsers, ...userConfig.pluginParsers];
  }
  return merged;
};

export const createParser = (parserConfig?: ParserConfig): Parser => {
  const config = getMergedConfig(parserConfig);
  const { commonParserConfig } = config;
  const commonParser = createCommonParser(commonParserConfig);
  const pluginParseList = config.pluginParsers
    .map((plugin) => getPluginParser(config, plugin))
    .filter((p) => p !== undefined);
  const pluginParse = (input: Scene) => {
    for (const plugin of pluginParseList) {
      input = plugin(input);
    }
    return input; // todo: 这里需要改成函数管道的写法
  };
  return {
    parse: (rawScene) => {
      const { name, url, str } = rawScene;
      const commonStenceList = commonParser.parse(str);
      const inputScene: Scene = {
        name: name,
        url: url,
        sentenceList: commonStenceList,
        raw: str,
      };
      return pluginParse(inputScene);
    },

    stringify: (input: Scene | Array<Sentence>, options?: unknown) => {
      if (options) return "";
      let arr = input;
      let result = "";
      if (!(input instanceof Array)) {
        arr = input.sentenceList;
      }
      (arr as Array<Sentence>).forEach((sentence) => {
        result += sentence.str;
      });
      return result;
    },

    commonParse: (str: string) => {
      return commonParser.parse(str);
    },

    plugins: (() => {
      const result: { [key: string]: PluginParse } = {};
      config.plugins.forEach((plugin) => {
        result[plugin.name] = plugin.parse;
      });
      return result;
    })(),
  };
};

const getPluginParser = (config: CompleteParserConfig, inputPlugin: PluginParserLike): PluginParse | undefined => {
  let parse;
  if (typeof inputPlugin === "string") {
    parse = config.plugins.find((plugin) => plugin.name === inputPlugin)?.parse;
  } else if (typeof inputPlugin === "object" && inputPlugin !== null && "parse" in inputPlugin) {
    parse = inputPlugin.parse;
  } else if (typeof inputPlugin === "function") {
    parse = inputPlugin;
  }
  return parse;
};
