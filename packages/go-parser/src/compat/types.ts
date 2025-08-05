import { commandType, fileType } from './config';

export type ConfigItem = { scriptString: string; scriptType: commandType };
export type ConfigMap = Map<string, ConfigItem>;

/**
 * 资源接口
 * @interface IAsset
 */
export interface IAsset {
  name: string; // 资源名称
  type: fileType; // 资源类型
  url: string; // 资源url
  lineNumber: number; // 触发资源语句的行号
}

interface IOptionItem {
  key: string;
  value: string | number | boolean;
}
interface IConfigItem {
  command: string;
  args: string[];
  options: IOptionItem[];
}

export type WebgalConfig = IConfigItem[];

export interface IWebGALStyleObj {
  classNameStyles: Record<string, string>;
  others: string;
}
