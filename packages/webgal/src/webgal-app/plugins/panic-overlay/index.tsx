import { PanicOverlay } from './PanicOverlay';
import { useUsePanic, useGetIsPanicOverlayOpen } from './hooks';

import { RootState } from '@/store/store';
import { useGenSyncRef } from '@/hooks/useGenSyncRef';

const createPanicOverlay = (options?: PanicOverlayOptions): WebgalPlugin<PanicOverlayOptions> => {
  return {
    name: 'panic-overlay',
    install(app: WebgalApp, useOptions?: PanicOverlayOptions) {
      const defaults = { hotkeys: ['Escape', 'Backquote'] };
      const config = { ...defaults, ...(options ?? {}), ...(useOptions ?? {}) };
      app.addPluginHotkeyHook(useUsePanic(config.hotkeys));

      app.addTopComponents([<PanicOverlay key="panic-overlay" />]);

      const getIsPanicOverlayOpen = () => {
        const GUIStore = useGenSyncRef((state: RootState) => state.GUI);
        return useGetIsPanicOverlayOpen(GUIStore)();
      };
      app.addMouseWheelDisabledCondition(getIsPanicOverlayOpen);
      app.extendGuiInitState('showPanicOverlay', false);
    },
  };
};

export { createPanicOverlay };
