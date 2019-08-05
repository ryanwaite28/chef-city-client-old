import { 
  setAppRouter,
  setSessionModel,
  setNavbarView,
  setPageContainerView,
  setFooterView,
} from './chamber';

import {
  check_session,
} from './client';

export default class App {
  constructor() {
    this.initApp();
  }

  private initApp() {
    check_session().then(sessionObj => {
      setSessionModel(sessionObj);
      setAppRouter();
      setNavbarView();
      setPageContainerView();
      setFooterView();
    });
  }
}