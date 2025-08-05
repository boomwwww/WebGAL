import { createPanicOverlay } from './panic-overlay';
import { createLive2dBase } from './live2d-base';

const pluginCreators = [
  {
    name: 'panic-overlay',
    create: createPanicOverlay,
  },
  {
    name: 'live2d-base',
    create: createLive2dBase,
  },
] as const;

export default pluginCreators;
