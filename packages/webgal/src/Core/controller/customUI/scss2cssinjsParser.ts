import { IWebGALStyleObj } from '@webgal-go/parser';
import { WebgalParser } from '@/Core/parser/sceneParser';

export function scss2cssinjsParser(scssString: string): IWebGALStyleObj {
  return WebgalParser.parseScssToWebgalStyleObj(scssString);
}
