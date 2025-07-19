import { createWebgalApp } from './webgal-go/index';
import panicOverlay from './webgal-go/plugins/panic-overlay';

const webgalApp = createWebgalApp();

webgalApp.use(panicOverlay({ hotkeys: ['Escape', 'Backquote'] }));

webgalApp.mount('#webgal-app');
