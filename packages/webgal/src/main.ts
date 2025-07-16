import { createWebGALApp } from './wg-app/index';
import panicOverlay from './wg-app/plugins/panicOverlay';

const wgApp = createWebGALApp();

// wgApp.use(panicOverlay({ key: ['Escape', 'Backquote'] }));

wgApp.mount('#wg-app');
