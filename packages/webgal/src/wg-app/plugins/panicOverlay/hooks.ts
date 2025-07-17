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
    // const panicButtonList = ['Escape', 'Backquote'];
    const getIsPanicButton = (ev: KeyboardEvent) =>
      !ev.isComposing && !ev.defaultPrevented && panicButtonList.includes(ev.code);
    const GUIStore = useGenSyncRef((state: RootState) => state.GUI);
    const getIsTitleShown = useCallback(() => GUIStore.current.showTitle, [GUIStore]);
    const isTitleShown = getIsTitleShown();
    const getIsPanicOverlayOpen = useGetIsPanicOverlayOpen(GUIStore);
    const isPanicOverlayOpen = getIsPanicOverlayOpen();
    const setComponentVisibility = useSetComponentVisibility();
    const handlePressPanicButton = useCallback((ev: KeyboardEvent) => {
      const isPanicButton = getIsPanicButton(ev);
      if (!isPanicButton || isTitleShown) return;
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
