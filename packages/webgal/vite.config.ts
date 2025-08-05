import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import loadVersion from 'vite-plugin-package-version';
import { resolve, relative } from 'path';
// import { visualizer } from 'rollup-plugin-visualizer';
import Info from 'unplugin-info/vite';
import pixiPerformAutoImport from './src/plugins/pixi-perform-auto-import';

import webgalGo from './src/webgal-app/vite-plugin/index';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    loadVersion(),
    Info(),
    pixiPerformAutoImport({
      scriptDir: resolve('src/Core/gameScripts/pixi/performs'),
      managerDir: resolve('src/Core/util/pixiPerformManager'),
      outputFile: 'initRegister.ts',
      watchDebounce: 100,
      clearWhenClose: false,
    }),
    webgalGo(),
    // @ts-ignore
    // visualizer(),
  ],
  resolve: {
    alias: {
      '@webgal-app': resolve('src/webgal-app'),
      '@': resolve('src'),
    },
  },
  build: {
    // sourcemap: true,
    // rollupOptions: {
    //   output: {
    //     manualChunks(idPath) {
    //       // if (!idPath.includes('node_modules')) {
    //       //   return;
    //       // }
    //       // const id = idPath.replaceAll('\\', '/').replace(/.*?node_modules\//, '');
    //       // if (id.includes('pixi-live2d-display-webgal')) {
    //       //   return 'vendor-pixi-live2d-display';
    //       // } else if (id.includes('react')) {
    //       //   return 'vendor-react';
    //       // } else if (id.includes('pixi')) {
    //       //   if (id.includes('filter')) {
    //       //     return 'vendor-pixi-filters';
    //       //   } else {
    //       //     return 'vendor-pixi-others';
    //       //   }
    //       // } else {
    //       //   return 'vendor-others';
    //       // }
    //     },
    //   },
    // },
  },
});
