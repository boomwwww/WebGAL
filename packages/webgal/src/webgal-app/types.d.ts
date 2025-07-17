type WebgalApp = import('./index').WebgalApp;

type WebgalPluginCreator = <T>(options: T) => WebgalPlugin<T>;

interface WebgalPlugin<T> {
  name: string;
  install: (app: WebgalApp, options?: T) => void;
}
