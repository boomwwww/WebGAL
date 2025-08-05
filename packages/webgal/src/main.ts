import { createWebgalApp } from './webgal-app/index';
import { createPanicOverlay } from './webgal-app/plugins/panic-overlay';

const webgalApp = createWebgalApp();

webgalApp.use(createPanicOverlay());

webgalApp.mount('#webgal-app');
