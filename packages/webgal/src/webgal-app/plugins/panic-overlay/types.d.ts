// type HotKeyConfig = import('@/hooks/useHotkey').HotKeyConfig;
type HotKeyConfig = string | string[];

interface PanicOverlayOptions {
  hotkeys: HotKeyConfig;
}

interface IExtendingGuiState {
  showPanicOverlay: boolean;
}

interface IComponentsVisibility {
  showPanicOverlay: boolean;
}
