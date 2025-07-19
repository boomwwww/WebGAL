import { switchAuto } from '@/Core/controller/gamePlay/autoPlay';
import { backToTitle } from '@/Core/controller/gamePlay/backToTitle';
import { switchFast } from '@/Core/controller/gamePlay/fastSkip';
import { loadGame } from '@/Core/controller/storage/loadGame';
import { saveGame } from '@/Core/controller/storage/saveGame';
import { showGlogalDialog, switchControls } from '@/UI/GlobalDialog/GlobalDialog';
import { easyCompile } from '@/UI/Menu/SaveAndLoad/Save/Save';
import useFullScreen from '@/hooks/useFullScreen';
import useSoundEffect from '@/hooks/useSoundEffect';
import useTrans from '@/hooks/useTrans';
import { setMenuPanelTag, setVisibility, MenuPanelTagEnum } from '@/store/GUIReducer';
// import { componentsVisibility, MenuPanelTag } from '@/store/guiInterface';
import { RootState } from '@/store/store';
import {
  AlignTextLeftOne,
  DoubleDown,
  DoubleRight,
  DoubleUp,
  FolderOpen,
  FullScreen,
  Home,
  Lock,
  OffScreen,
  PlayOne,
  PreviewCloseOne,
  PreviewOpen,
  ReplayMusic,
  Save,
  SettingTwo,
  Unlock,
} from '@icon-park/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styles from './bottomControlPanel.module.scss';

export const BottomControlPanel = () => {
  const t = useTrans('gaming.');
  const strokeWidth = 2.5;
  const { i18n } = useTranslation();
  const { playSeEnter, playSeClick, playSeDialogOpen } = useSoundEffect();
  const lang = i18n.language;
  const isFr = lang === 'fr';
  let size = 42;
  let fontSize = '150%';
  if (isFr) {
    fontSize = '125%';
    size = 40;
  }
  const { isSupported: isFullscreenSupport, isFullScreen, toggle: toggleFullscreen } = useFullScreen();
  const GUIStore = useSelector((state: RootState) => state.GUI);
  const stageState = useSelector((state: RootState) => state.stage);
  const dispatch = useDispatch();
  const setComponentVisibility = (component: keyof componentsVisibility, visibility: boolean) => {
    dispatch(setVisibility({ component, visibility }));
  };
  const setMenuPanel = (menuPanel: MenuPanelTagEnumType) => {
    dispatch(setMenuPanelTag(menuPanel));
  };

  const saveData = useSelector((state: RootState) => state.saveData.saveData);
  let fastSlPreview = (
    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '125%' }}>{t('noSaving')}</div>
    </div>
  );
  if (saveData[0]) {
    const data = saveData[0];
    fastSlPreview = (
      <div className={styles.slPreviewMain}>
        <div className={styles.imgContainer}>
          <img style={{ height: '100%' }} alt="q-save-preview image" src={data.previewImage} />
        </div>
        <div className={styles.textContainer}>
          <div>{easyCompile(data.nowStageState.showName)}</div>
          <div style={{ fontSize: '75%', color: 'rgb(55,60,56)' }}>{easyCompile(data.nowStageState.showText)}</div>
        </div>
      </div>
    );
  }

  return (
    // <div className={styles.ToCenter}>
    <>
      {GUIStore.showTextBox && stageState.enableFilm === '' && (
        <div className={styles.main} style={{ visibility: GUIStore.controlsVisibility ? 'visible' : 'hidden' }}>
          {GUIStore.showTextBox && (
            <span
              className={styles.singleButton}
              style={{ fontSize }}
              onClick={() => {
                setComponentVisibility('showTextBox', false);
                playSeClick();
              }}
              onMouseEnter={playSeEnter}
            >
              <PreviewCloseOne
                className={styles.button}
                theme="outline"
                size={size}
                fill="#f5f5f7"
                strokeWidth={strokeWidth}
              />
              <span className={styles.button_text}>{t('buttons.hide')}</span>
            </span>
          )}
          {!GUIStore.showTextBox && (
            <span
              className={styles.singleButton}
              style={{ fontSize }}
              onClick={() => {
                setComponentVisibility('showTextBox', true);
                playSeClick();
              }}
              onMouseEnter={playSeEnter}
            >
              <PreviewOpen
                className={styles.button}
                theme="outline"
                size={size}
                fill="#f5f5f7"
                strokeWidth={strokeWidth}
              />
              <span className={styles.button_text}>{t('buttons.show')}</span>
            </span>
          )}
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              setComponentVisibility('showBacklog', true);
              setComponentVisibility('showTextBox', false);
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <AlignTextLeftOne
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>{t('buttons.backlog')}</span>
          </span>
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              let VocalControl: any = document.getElementById('currentVocal');
              if (VocalControl !== null) {
                VocalControl.currentTime = 0;
                VocalControl.pause();
                VocalControl?.play();
              }
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <ReplayMusic
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>{t('buttons.replay')}</span>
          </span>
          <span
            id="Button_ControlPanel_auto"
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              switchAuto();
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <PlayOne className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>{t('buttons.auto')}</span>
          </span>
          <span
            id="Button_ControlPanel_fast"
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              switchFast();
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <DoubleRight
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>{t('buttons.forward')}</span>
          </span>
          <span
            className={styles.singleButton + ' ' + styles.fastsave}
            style={{ fontSize }}
            onClick={() => {
              saveGame(0);
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <DoubleDown
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>{t('buttons.quicklySave')}</span>
            <div className={styles.fastSlPreview + ' ' + styles.fastSPreview}>{fastSlPreview}</div>
          </span>
          <span
            className={styles.singleButton + ' ' + styles.fastload}
            style={{ fontSize }}
            onClick={() => {
              loadGame(0);
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <DoubleUp className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>{t('buttons.quicklyLoad')}</span>
            <div className={styles.fastSlPreview + ' ' + styles.fastLPreview}>{fastSlPreview}</div>
          </span>
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              setMenuPanel(MenuPanelTagEnum.Save);
              setComponentVisibility('showMenuPanel', true);
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <Save className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>{t('buttons.save')}</span>
          </span>
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              setMenuPanel(MenuPanelTagEnum.Load);
              setComponentVisibility('showMenuPanel', true);
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <FolderOpen
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>{t('buttons.load')}</span>
          </span>
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              setMenuPanel(MenuPanelTagEnum.Option);
              setComponentVisibility('showMenuPanel', true);
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            <SettingTwo
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>{t('buttons.options')}</span>
          </span>
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              playSeDialogOpen();
              showGlogalDialog({
                title: t('buttons.titleTips'),
                leftText: t('$common.yes'),
                rightText: t('$common.no'),
                leftFunc: () => {
                  backToTitle();
                },
                rightFunc: () => {},
              });
            }}
            onMouseEnter={playSeEnter}
          >
            <Home className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>{t('buttons.title')}</span>
          </span>
          {isFullscreenSupport && (
            <span
              className={`${styles.singleButton}`}
              style={{ fontSize }}
              onClick={toggleFullscreen}
              onMouseEnter={playSeEnter}
            >
              {!isFullScreen && (
                <FullScreen
                  className={styles.button}
                  theme="outline"
                  size={size}
                  fill="#f5f5f7"
                  strokeWidth={strokeWidth}
                />
              )}
              {isFullScreen && (
                <OffScreen
                  className={styles.button}
                  theme="outline"
                  size={size}
                  fill="#f5f5f7"
                  strokeWidth={strokeWidth}
                />
              )}
              <span className={styles.button_text}>{t('buttons.fullscreen')}</span>
            </span>
          )}
          <span
            className={styles.singleButton}
            style={{ fontSize }}
            onClick={() => {
              switchControls();
              playSeClick();
            }}
            onMouseEnter={playSeEnter}
          >
            {GUIStore.showControls ? (
              <Lock className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            ) : (
              <Unlock className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            )}
          </span>
        </div>
      )}
    </>
    // </div>
  );
};
