import { createWebgalApp } from './webgal-app/index';
import panicOverlay from './webgal-app/plugins/panicOverlay';

const webgalApp = createWebgalApp();

webgalApp
  .use(panicOverlay({ hotkeys: ['Escape', 'Backquote'] }))
  .use({ name: 'plugin1', install() {} })
  .use({ name: 'plugin2', install() {} })
  .mount('#webgal-app');
