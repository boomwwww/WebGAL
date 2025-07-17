import { JSX, ReactPortal } from 'react';

import { webgalAppObj } from './webgalApp';

export type WebgalApp = typeof app;

const app = {
  addComponents(components: (JSX.Element | ReactPortal)[]) {
    webgalAppObj.addComponents(components);
  },
  addTopComponents(components: (JSX.Element | ReactPortal)[]) {
    webgalAppObj.addTopComponents(components);
  },
  addPluginHotkeyHook(pluginHotkeyHook: () => void) {
    webgalAppObj.addPluginHotkeyHook(pluginHotkeyHook);
  },
  addMouseWheelDisabledCondition(condition: () => boolean) {
    webgalAppObj.addMouseWheelDisabledCondition(condition);
  },
  extendGuiInitState<K extends keyof IExtendingGuiState>(state: K, value: IExtendingGuiState[K]) {
    webgalAppObj.extendGuiInitState(state, value);
  },
  use<T>(plugin: WebgalPlugin<T>, options?: T) {
    console.log(`use plugin ${plugin.name}`);
    plugin.install(app, options);
    return app;
  },
  mount(selctor: string) {
    console.log(`mount ${selctor}`);
    webgalAppObj.init(selctor);
  },
  $args: [] as any[],
};
export const createWebgalApp = (...args: {}[]) => {
  app.$args = [...args];
  return app;
};

export const createWebgalStage = (...args: {}[]) => {
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
