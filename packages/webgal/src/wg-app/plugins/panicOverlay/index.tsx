import { PanicOverlay } from './PanicOverlay';
import { useUsePanic, useGetIsPanicOverlayOpen } from './hooks';

import { RootState } from '@/store/store';
import { useGenSyncRef } from '@/hooks/useGenSyncRef';

const panicOverlay = ({ key }: { key: string[] }): WgPlugin => {
  return {
    name: 'panicOverlay',
    install(app: WgApp, useOptions: any) {
      const defaults = { key: ['Escape', 'Backquote'] };
      const config = { ...defaults, key, ...useOptions };
      app.addTopComponents([<PanicOverlay key="panic-overlay" />]);
      app.addPluginHotkeyHook(useUsePanic(config.key));
      const GUIStore = useGenSyncRef((state: RootState) => state.GUI);
      const getIsPanicOverlayOpen = useGetIsPanicOverlayOpen(GUIStore);
      app.addMouseWheelDisabledCondition(getIsPanicOverlayOpen);
    },
  };
};

export default panicOverlay;
