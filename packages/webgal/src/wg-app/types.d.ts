type WgApp = import('./index').WgApp;

interface WgPlugin {
  name: string;
  install: (app: any, options?: any) => void;
}
