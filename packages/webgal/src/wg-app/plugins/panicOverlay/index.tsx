import { PanicOverlay } from './PanicOverlay';

const panicOverlay = ({ key }: { key: string[] }): WgPlugin => {
  return {
    name: 'panicOverlay',
    install(app: WgApp, useOptions: any) {
      const defaults = { key: ['Escape'] };
      const config = { ...defaults, key, ...useOptions };
      app.addComponents([<PanicOverlay key="panic-overlay" />]);
    },
  };
};

export default panicOverlay;
