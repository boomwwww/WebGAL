/**
 * @file 记录当前GUI的状态信息，引擎初始化时会重置。
 * @author Mahiru
 */
import { getStorage } from '@/Core/controller/storage/storageController';
// import { GuiAsset, IGuiState, MenuPanelTag, setAssetPayload, setVisibilityPayload } from './guiInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { key } from 'localforage';

/**
 * 当前Menu页面显示的Tag1
 */
// export enum MenuPanelTag {
//   Save, // “保存”选项卡
//   Load, // “读取”选项卡
//   Option, // “设置”选项卡
// }

export const MenuPanelTagEnum = Object.freeze({
  Save: 0,
  Load: 1,
  Option: 2,
} as const);
/**
 * Save: 0, Load: 1, Option: 2
 */
export type MenuPanelTagEnumType = (typeof MenuPanelTagEnum)[keyof typeof MenuPanelTagEnum];

const defaultInitState = {
  showBacklog: false,
  showStarter: true,
  showTitle: true,
  showMenuPanel: false,
  showTextBox: true,
  showControls: true,
  controlsVisibility: true,
  currentMenuTag: MenuPanelTagEnum.Option,
  titleBg: '',
  titleBgm: '',
  logoImage: [],
  showExtra: false,
  showGlobalDialog: false,
  // showPanicOverlay: false,
  isEnterGame: false,
  isShowLogo: true,
  enableAppreciationMode: false, // Paf87
  fontOptimization: false,
};

export const extendInitState = <K extends keyof IExtendingGuiState>(state: K, value: IExtendingGuiState[K]) => {
  extendingInitState[state] = value;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const extendingInitState = {} as IExtendingGuiState;

/**
 * 初始GUI状态表
 */
const initState: IGuiState = {
  ...defaultInitState,
  ...extendingInitState,
};

/**
 * GUI状态的Reducer
 */
const GUISlice = createSlice({
  name: 'gui',
  initialState: initState,
  reducers: {
    /**
     * 设置GUI的各组件的显示状态
     * @param state 当前GUI状态
     * @param action 改变显示状态的Action
     */
    setVisibility: (state, action: PayloadAction<setVisibilityPayload>) => {
      getStorage();
      const { component, visibility } = action.payload;
      state[component] = visibility;
    },
    /**
     * 设置MenuPanel的当前选中项
     * @param state 当前GUI状态
     * @param action 改变当前选中项的Action
     */
    setMenuPanelTag: (state, action: PayloadAction<MenuPanelTagEnumType>) => {
      getStorage();
      state.currentMenuTag = action.payload;
    },
    /**
     * 设置GUI资源的值
     * @param state 当前GUI状态
     * @param action 改变资源的Action
     */
    setGuiAsset: (state, action: PayloadAction<setAssetPayload>) => {
      const { asset, value } = action.payload;
      state[asset] = value;
    },
    setLogoImage: (state, action: PayloadAction<string[]>) => {
      state.logoImage = [...action.payload];
    },
    /**
     * 设置 enableAppreciationMode 属性
     * @param state 当前GUI状态
     * @param action 改变 enableAppreciationMode 属性的Action
     */
    setEnableAppreciationMode: (state, action: PayloadAction<boolean>) => {
      state.enableAppreciationMode = action.payload;
    },
    setFontOptimization: (state, action: PayloadAction<boolean>) => {
      state.fontOptimization = action.payload;
    },
  },
});

export const {
  setVisibility,
  setMenuPanelTag,
  setGuiAsset,
  setLogoImage,
  setEnableAppreciationMode,
  setFontOptimization,
} = GUISlice.actions;
export default GUISlice.reducer;

// export function GuiStateStore(): GuiStore {
//     const [GuiState, setGuiState] = useState(initState);
//     /**
//      * 设置各组件的可见性
//      * @param key 设置的组件
//      * @param value 可见性，true or false
//      */
//     const setVisibility = <K extends keyof componentsVisibility>(key: K, value: boolean) => {
//
//         setGuiState(state => {
//             getStorage();
//             state[key] = value;
//             if (key === 'showMenuPanel' || key === 'showBacklog') {
//                 state['showTextBox'] = !value;
//             }
//             return {...state};
//         });
//
//     };
//
//     /**
//      * 设置Menu组件显示的标签页
//      * @param value 标签页
//      */
//     const setMenuPanelTag = (value: MenuPanelTag) => {
//
//         setGuiState(state => {
//             getStorage();
//             state.currentMenuTag = value;
//             return {...state};
//         });
//
//     };
//
//     /**
//      * 设置标题页的资源路径
//      * @param key 资源名
//      * @param value 资源路径
//      */
//     const setGuiAsset = <K extends keyof GuiAsset>(key: K, value: string) => {
//
//         setGuiState(state => {
//             state[key] = value;
//             return {...state};
//         });
//
//     };
//
//     return {
//         GuiState,
//         setGuiAsset,
//         setVisibility,
//         setMenuPanelTag,
//     };
// }
