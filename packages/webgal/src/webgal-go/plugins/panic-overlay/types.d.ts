type HotKeyConfig = import('@/hooks/useHotkey').HotKeyConfig;

interface PanicOverlayOptions {
  hotkeys: HotKeyConfig;
}

interface IExtendingGuiState {
  showPanicOverlay: boolean;
}

interface IComponentsVisibility {
  showPanicOverlay: boolean;
}
