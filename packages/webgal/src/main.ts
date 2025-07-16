import { createWebGALApp } from './wg-app/index';
import { panicOverlay } from './wg-app/plugins/panicOverlay';

const wgApp = createWebGALApp();

wgApp.use(panicOverlay());

wgApp.mount('#wg-app');
