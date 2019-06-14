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
    check_session()
    .then(resp => {
      let sessionObj;
      if (resp.user) {
        const user = { ...resp.user };
        delete resp.user;
        sessionObj = { ...resp, ...user }
      } else {
        sessionObj = { ...resp }
      }
      
      setSessionModel(sessionObj);
      setAppRouter();
      setNavbarView();
      setPageContainerView();
      setFooterView();
    });
  }
}