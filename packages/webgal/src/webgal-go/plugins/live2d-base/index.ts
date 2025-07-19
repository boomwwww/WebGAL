const l2d = (options?: { color?: string }) => {
  return {
    name: 'panicOverlay',
    install(app: any, options = {}) {
      const defaults = { color: 'yellow' };
      const config = Object.assign(defaults, options);
      // 1. 添加全局方法或属性
      app.config.globalProperties.$myMethod = (text: any) => {
        // console.log(`插件方法: ${text} | 选项: ${options?.name}`);
      };

      // 2. 添加全局指令
      app.directive('highlight', {
        mounted(el: any, binding: any) {
          el.style.backgroundColor = binding.value || 'yellow';
        },
      });

      // 3. 添加全局组件（需导入组件）
      app.component('Greeting', {
        template: `<h3>来自插件的问候: {{ message }}</h3>`,
        props: ['message'],
      });

      // 4. 使用 provide/inject
      app.provide('pluginSymbol', Symbol('插件标识'));
    },
  };
};

export default l2d;
