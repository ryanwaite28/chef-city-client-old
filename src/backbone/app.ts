import { 
  setAppRouter,
  setSessionModel,
  setNavbarView,
  setPageContainerView,
  setFooterView,
} from './chamber';

export default class App {
  constructor() {
    this.initApp();
  }

  private initApp() {
    setSessionModel({ online: false });
    setAppRouter();
    setNavbarView();
    setPageContainerView();
    setFooterView();
  }
}