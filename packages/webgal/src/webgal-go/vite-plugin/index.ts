import type { PluginOption } from 'vite';

export default (): PluginOption => {
  console.log('正在初始化webgal-go');

  return {
    name: 'vite-plugin-webgal-go',
  };
};
