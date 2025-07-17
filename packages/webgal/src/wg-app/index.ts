import { JSX, ReactPortal } from 'react';

import { wgAppObj } from './wsApp';

// import { IGuiState } from '@/store/guiInterface';

export type WgApp = typeof app;

const app = {
  addComponents(components: (JSX.Element | ReactPortal)[]) {
    wgAppObj.addComponents(components);
  },
  addTopComponents(components: (JSX.Element | ReactPortal)[]) {
    wgAppObj.addTopComponents(components);
  },
  addPluginHotkeyHook(pluginHotkeyHook: () => void) {
    wgAppObj.addPluginHotkeyHook(pluginHotkeyHook);
  },
  addMouseWheelDisabledCondition(condition: () => boolean) {
    wgAppObj.addMouseWheelDisabledCondition(condition);
  },
  extendGuiInitState<K extends keyof IExtendingGuiState>(state: K, value: IExtendingGuiState[K]) {
    wgAppObj.extendGuiInitState(state, value);
  },
  use(plugin: any, options?: any) {
    console.log(`use plugin ${plugin.name}`);
    plugin.install(app, options ?? {});
  },
  mount(selctor: string) {
    console.log(`mount ${selctor}`);
    wgAppObj.init(selctor);
  },
  $args: [] as any[],
};
export const createWebGALApp = (...args: {}[]) => {
  app.$args = [...args];

  return app;
};

export const createWebGALStage = (...args: {}[]) => {
  return {
    use(plugin: any) {
      console.log(`use ${plugin.name}`);
    },
    mount(selctor: string) {
      console.log(`mount ${selctor}`);
    },
    $args: [...args],
  };
};
