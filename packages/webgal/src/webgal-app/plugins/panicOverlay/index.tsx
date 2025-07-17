import { PanicOverlay } from './PanicOverlay';
import { useUsePanic, useGetIsPanicOverlayOpen } from './hooks';

import { RootState } from '@/store/store';
import { useGenSyncRef } from '@/hooks/useGenSyncRef';

const panicOverlay = (options: { hotkeys: string[] }): WebgalPlugin => {
  return {
    name: 'panicOverlay',
    install(app: WgApp, useOptions: any) {
      const defaults = { hotkeys: ['Escape', 'Backquote'] };
      const config = { ...defaults, ...options, ...useOptions };
      app.addPluginHotkeyHook(useUsePanic(config.key));

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

export default panicOverlay;
