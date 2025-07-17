import { createWebgalApp } from './webgal-app/index';
import panicOverlay from './webgal-app/plugins/panicOverlay';

const webgalApp = createWebgalApp();

webgalApp.use(panicOverlay({ hotkeys: ['Escape', 'Backquote'] }));

webgalApp.mount('#webgal-app');
