import { logger } from '../logger';
import { syncWithOrigine } from '@/Core/util/syncWithEditor/syncWithOrigine';
// import { DebugCommand, IComponentVisibilityCommand, IDebugMessage } from '@/types/debugProtocol';
import { WebGAL } from '@/Core/WebGAL';
import { webgalStore } from '@/store/store';
import { sceneParser, WebgalParser } from '@/Core/parser/sceneParser';
import { runScript } from '@/Core/controller/gamePlay/runScript';
import { nextSentence } from '@/Core/controller/gamePlay/nextSentence';
import { setFontOptimization, setVisibility } from '@/store/GUIReducer';
import { resetStage } from '@/Core/controller/stage/resetStage';
import { ISentence } from '@/Core/controller/scene/sceneInterface';

enum DebugCommand {
  // 跳转
  JUMP,
  // 同步自客户端
  SYNCFC,
  // 同步自编辑器
  SYNCFE,
  // 执行指令
  EXE_COMMAND,
  // 重新拉取模板样式文件
  REFETCH_TEMPLATE_FILES,
  // 返回主界面
  SET_COMPONENT_VISIBILITY,
  // 临时场景
  TEMP_SCENE,
  // 字体优化
  FONT_OPTIMIZATION,
}

const visibilitySettableComponentOptions = ['showTitle', 'showMenuPanel', 'showPanicOverlay'] as const;

export const webSocketFunc = () => {
  const protocol: string = window.location.protocol;
  const loc: string = window.location.hostname;
  const port: string = window.location.port; // 获取端口号

  if (protocol !== 'http:' && protocol !== 'https:') {
    return;
  }

  // 默认情况下，不需要在URL中明确指定标准HTTP(80)和HTTPS(443)端口
  let isDefaultPort = port === '80' || port === '443';
  const wsPort = isDefaultPort ? '' : `:${port}`;

  // 根据当前协议构建WebSocket URL，并包括端口号（如果有）
  const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${wsProtocol}//${loc}${wsPort}/api/webgalsync`;

  logger.info('正在启动socket连接位于：' + wsUrl);

  const socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    logger.info('socket已连接');
    function sendStageSyncMessage() {
      const message: IDebugMessage = {
        event: 'message',
        data: {
          command: 'SYNCFC',
          sceneMsg: {
            scene: WebGAL.sceneManager.sceneData.currentScene.sceneName,
            sentence: WebGAL.sceneManager.sceneData.currentSentenceId,
          },
          stageSyncMsg: webgalStore.getState().stage,
          message: 'sync',
        },
      };
      socket.send(JSON.stringify(message));
      // logger.debug('传送信息', message);
      setTimeout(sendStageSyncMessage, 1000);
    }
    sendStageSyncMessage();
  };

  socket.onmessage = (e) => {
    // logger.info('收到信息', e.data);
    const str: string = e.data;
    const data: IDebugMessage = JSON.parse(str);
    const message = data.data;
    switch (message.command) {
      case 'JUMP': {
        syncWithOrigine(message.sceneMsg.scene, message.sceneMsg.sentence, message.message === 'exp');
        break;
      }
      case 'EXE_COMMAND': {
        const command = message.message;
        const scene = WebgalParser.parse(command, 'temp.txt', 'temp.txt');
        scene.sentenceList.forEach((sentence: ISentence) => {
          runScript(sentence);
        });
        break;
      }
      case 'REFETCH_TEMPLATE_FILES': {
        const title = document.getElementById('Title_enter_page');
        if (title) {
          title.style.display = 'none';
        }
        WebGAL.events.styleUpdate.emit();
        break;
      }
      case 'SET_COMPONENT_VISIBILITY': {
        const command = message.message;
        const commandData = JSON.parse(command) as IComponentVisibilityCommand[];
        commandData.forEach((item) => {
          if (item) {
            webgalStore.dispatch(setVisibility({ component: item.component, visibility: item.visibility }));
          }
        });
        break;
      }
      case 'TEMP_SCENE': {
        const command = message.message;
        resetStage(true);
        WebGAL.sceneManager.sceneData.currentScene = sceneParser(command, 'temp', './temp.txt');
        for (const option of visibilitySettableComponentOptions) {
          webgalStore.dispatch(setVisibility({ component: option, visibility: false }));
        }
        setTimeout(() => {
          nextSentence();
        }, 100);
        break;
      }
      case 'FONT_OPTIMIZATION': {
        const command = message.message;
        webgalStore.dispatch(setFontOptimization(command === 'true'));
        break;
      }
      default: {
        logger.warn('未知的调试命令');
        break;
      }
    }
  };
  socket.onerror = (_e) => {
    logger.info('当前没有连接到 Terre 编辑器');
  };
};
