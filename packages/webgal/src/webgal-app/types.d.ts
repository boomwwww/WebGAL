type WgApp = import('./index').WgApp;

interface WebgalPlugin {
  name: string;
  install: (app: any, options?: any) => void;
}
