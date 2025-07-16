import React from 'react';
import ReactDOM from 'react-dom';

function WsApp() {



  return (
    <>
      {/* <!--快速显示落地页，让用户感知不到加载的过程--> */}
      <div id="ebg" />
      <div id="Title_enter_page" onClick={enter()}>
        {/* <!--    落地页背景--> */}
        <div id="Title_bg_container" />
        {/* <!--    点击后的白色渐变--> */}
        <div id="Title_white_container"></div>
        {/* <!--    落地页文字--> */}
        <div id="Title_enter_text">
          <div class="toCenter">
            <div class="StartButton">PRESS THE SCREEN TO START</div>
          </div>
          <div class="link-to-github">
            <div>
              Powered by
              <a
                href="https://github.com/OpenWebGAL/WebGAL"
                onclick="jump(event, 'https://github.com/OpenWebGAL/WebGAL')"
              >
                WebGAL
              </a>
              Framework
            </div>
          </div>
        </div>
      </div>
      <div id="panic-overlay">{/* <!-- 紧急回避 --> */}</div>
      <div id="root"></div>
    </>
  );
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <WsApp />
  </React.StrictMode>,
  document.getElementById('ws-app'),
);
