/**
 * 注册 Service Worker
 */
const u = navigator.userAgent;
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 判断是否是 iOS终端
if ('serviceWorker' in navigator && !isIOS) {
  navigator.serviceWorker
    .register('./webgal-serviceworker.js')
    .then(function (reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    })
    .catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
