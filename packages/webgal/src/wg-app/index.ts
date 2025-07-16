import { wgAppInit } from './wsApp';

export const createWebGALApp = (...args: {}[]) => {
  return {
    use(plugin: any) {
      console.log(`use ${plugin.name}`);
    },
    mount(selctor: string) {
      console.log(`mount ${selctor}`);
      wgAppInit(selctor);
    },
    $args: [...args],
  };
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
