import { useCallback } from 'react';

import { RootState } from '@/store/store';

import { stopAll } from '@/Core/controller/gamePlay/fastSkip';

import { useSetComponentVisibility } from '@/hooks/useHotkey';
import { useGenSyncRef } from '@/hooks/useGenSyncRef';
import { useMounted, useUnMounted } from '@/hooks/useLifeCycle';
export function useUsePanic(panicButtonList: string[]) {
  /**
   * Panic Button, use Esc and Backquote
   */
  function usePanic() {
    const getIsPanicButton = (ev: KeyboardEvent) =>
      !ev.isComposing && !ev.defaultPrevented && panicButtonList.includes(ev.code);
    const GUIStore = useGenSyncRef((state: RootState) => state.GUI);
    const getIsTitleShown = useCallback(() => GUIStore.current.showTitle, [GUIStore]);
    const getIsPanicOverlayOpen = useGetIsPanicOverlayOpen(GUIStore);
    const setComponentVisibility = useSetComponentVisibility();
    const handlePressPanicButton = useCallback((ev: KeyboardEvent) => {
      const isPanicButton = getIsPanicButton(ev);
      const isTitleShown = getIsTitleShown();
      if (!isPanicButton || isTitleShown) return;
      const isPanicOverlayOpen = getIsPanicOverlayOpen();
      if (isPanicOverlayOpen) {
        setComponentVisibility('showPanicOverlay', false);
        // todo: resume
      } else {
        setComponentVisibility('showPanicOverlay', true);
        stopAll(); // despite the name, it only disables fast mode and auto mode
        // todo: pause music & animation for better performance
      }
    }, []);
    useMounted(() => {
      document.addEventListener('keyup', handlePressPanicButton);
    });
    useUnMounted(() => {
      document.removeEventListener('keyup', handlePressPanicButton);
    });
  }
  return usePanic;
}

export function useGetIsPanicOverlayOpen<T = any>(GUIStore: T & any): () => boolean {
  return useCallback(() => {
    return GUIStore.current.showPanicOverlay;
  }, [GUIStore]);
}
