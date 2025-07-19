import { createPanicOverlay } from './panic-overlay';
import l2d from './live2d-base';

const pluginCreators = [
  {
    name: 'panic-overlay',
    create: createPanicOverlay,
  },
  {
    name: 'live2d-base',
    create: l2d,
  },
] as const;

export default pluginCreators;
