import './ws-app/styles/index.css';

function loadScript(url: string, type?: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    if (type) {
      script.type = type;
    }
    script.onload = () => resolve(`Loaded: ${url}`);
    script.onerror = (error) => reject(new Error(`Failed to load: ${url}`));
    document.head.appendChild(script);
  });
}
await loadScript('scripts/windowsize.js');
await loadScript('scripts/serviceworker.js');

await import('./main.tsx');

await loadScript('scripts/loadlive2d.js');
await loadScript('scripts/enter.js');
