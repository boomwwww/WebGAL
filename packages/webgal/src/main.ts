import { createWebgalApp } from '@webgal-go/index';
import { createPanicOverlay } from '@webgal-go/plugins/panic-overlay';

const webgalApp = createWebgalApp();

webgalApp.use(createPanicOverlay());

webgalApp.mount('#webgal-app');
