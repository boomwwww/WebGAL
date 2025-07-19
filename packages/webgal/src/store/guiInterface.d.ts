// import { IWebGalTextBoxTheme } from '@/Stage/themeInterface';

/*
 * 当前Menu页面显示的Tag
 */
// declare enum MenuPanelTag {
//   Save, // “保存”选项卡
//   Load, // “读取”选项卡
//   Option, // “设置”选项卡
// }
/**
 * Save: 0, Load: 1, Option: 2
 */
type MenuPanelTagEnumType = import('./GUIReducer').MenuPanelTagEnumType;

/**
 * @interface IGuiState GUI状态接口
 */
interface IGuiState extends IExtendingGuiState {
  showStarter: boolean; // 是否显示初始界面（用于使得bgm可以播放)
  showTitle: boolean; // 是否显示标题界面
  showMenuPanel: boolean; // 是否显示Menu界面
  showTextBox: boolean;
  showControls: boolean;
  controlsVisibility: boolean;
  // currentMenuTag: MenuPanelTag; // 当前Menu界面的选项卡
  currentMenuTag: MenuPanelTagEnumType;
  showBacklog: boolean;
  titleBgm: string; // 标题背景音乐
  titleBg: string; // 标题背景图片
  logoImage: string[];
  showExtra: boolean;
  showGlobalDialog: boolean;
  // showPanicOverlay: boolean;
  isEnterGame: boolean;
  isShowLogo: boolean;
  enableAppreciationMode: boolean; // Pc102
  fontOptimization: boolean; // 字体优化
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IExtendingGuiState {}

type componentsVisibility = Pick<
  IGuiState,
  Exclude<keyof IGuiState, 'currentMenuTag' | 'titleBg' | 'titleBgm' | 'logoImage' | 'theme'>
>;
// 标题资源
type GuiAsset = Pick<IGuiState, 'titleBgm' | 'titleBg'>;

interface IGuiStore {
  GuiState: IGuiState;
  setGuiAsset: <K extends keyof GuiAsset>(key: K, value: string) => void;
  setVisibility: <K extends keyof componentsVisibility>(key: K, value: boolean) => void;
  setMenuPanelTag: (value: MenuPanelTag) => void;
}

interface setVisibilityPayload {
  component: keyof componentsVisibility;
  visibility: boolean;
}

interface setAssetPayload {
  asset: keyof GuiAsset;
  value: string;
}

type GuiStore = IGuiStore;
