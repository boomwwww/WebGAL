import { useEffect } from 'react';
import { WebGAL } from '@/Core/WebGAL';
import axios from 'axios';
import { scss2cssinjsParser } from '@/Core/controller/customUI/scss2cssinjsParser';
import { useValue } from '@/hooks/useValue';
import { css, injectGlobal } from '@emotion/css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { IWebGALStyleObj } from 'webgal-parser/build/types/styleParser';
import { logger } from '@/Core/util/logger';

export default function useApplyStyle(url: string) {
  const styleObject = useValue<IWebGALStyleObj>({ classNameStyles: {}, others: '' });
  const replaced = useSelector((state: RootState) => state.stage.replacedUIlable);

  const applyStyle = (classNameLable: string, fallbackClassName: string) => {
    // 先看看是否被用户用 applyStyle 指令替换了类名
    const className = replaced?.[classNameLable] ?? classNameLable;
    if (Object.keys(styleObject.value.classNameStyles).includes(className)) {
      const cijClassName = css(styleObject.value.classNameStyles?.[className] ?? '');
      return `${fallbackClassName} ${cijClassName}`;
    }
    return fallbackClassName;
  };

  const updateStyleFile = async () => {
    logger.debug('更新 Scss 文件', url);
    const resp = await axios.get(`game/template/${url}`);
    const scssStr = resp.data;
    styleObject.set(scss2cssinjsParser(scssStr));
  };

  useEffect(() => {
    updateStyleFile();
  }, []);

  useEffect(() => {
    injectGlobal(styleObject.value.others);
  }, [styleObject.value.others]);

  useRigisterStyleUpdate(updateStyleFile);

  return applyStyle;
}

function useRigisterStyleUpdate(callback: Function) {
  const handler = () => {
    callback();
  };
  useEffect(() => {
    WebGAL.events.styleUpdate.on(handler);
    return () => WebGAL.events.styleUpdate.off(handler);
  }, []);
}

interface IStyleTemplateTable {
  table: Array<{ templateName: string; path: string }>;
  default: string;
}

export const styleTemplateTable: IStyleTemplateTable = await (async () => {
  try {
    const resp = await axios.get(`game/template/templateTable.json`);
    logger.info(`获取样式模板表成功${JSON.stringify(resp.data)}`);
    return resp.data;
  } catch (e) {
    logger.warn(`获取样式模板表失败${e}`);
    return {
      table: [{ templateName: 'default', path: './template.json' }],
      default: 'default',
    };
  }
})();
