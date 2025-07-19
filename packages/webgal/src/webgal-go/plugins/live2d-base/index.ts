const createLive2dBase = (options?: { color?: string }): WebgalPlugin<{ color?: string }> => {
  return {
    name: 'live2d-base',
    install(app: WebgalApp, useOptions) {
      const defaults = { color: 'yellow' };
      const config = { ...defaults, ...(options ?? {}), ...(useOptions ?? {}) };
    },
  };
};

export { createLive2dBase };
