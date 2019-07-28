import {
  history,
  Router,
  View,
  Model,
} from 'backbone';
import { Subject } from 'rxjs';

import Models from './models/_main';
import Views from './views/_main';

import AppRouter from './router';

const AppStore: any = {};
export const Stream = new Subject();
export enum ActionTypes {
  SESSION_CHANGE,
}

// export const actions: any = {};

export function setAppRouter() {
  if (!AppStore.AppRouter) {
    const router: Router = new AppRouter();
    AppStore.AppRouter = router;
    history.start();

    // const current = AppStore.AppRouter.current();
    // console.log(current);
  }
}

export function getAppRouter() {
  return AppStore.AppRouter;
}

export function setSessionModel(sessionResp: any, triggerStream: boolean = false) {
  let sessionObj;
  if (sessionResp.user) {
    const user = { ...sessionResp.user };
    delete sessionResp.user;
    sessionObj = { ...sessionResp, ...user }
  } else {
    sessionObj = { ...sessionResp }
  }

  if (!AppStore.sessionModel) {
    AppStore.sessionModel = new Models.SessionModel(sessionObj);
  } else {
    AppStore.sessionModel.set(sessionObj);
  }

  if (triggerStream) {
    const info = {
      actionType: ActionTypes.SESSION_CHANGE,
      data: AppStore.sessionModel
    };
    Stream.next(info);
  }
}

export function getSessionModel(): Model {
  return AppStore.sessionModel;
}

export function setNavbarView() {
  AppStore.navbarView = new Views.NavbarView({ model: AppStore.sessionModel });
}
export function setPageContainerView() {
  AppStore.pageContainerViewView = new Views.PageContainerView();
}
export function setFooterView() {
  AppStore.footerView = new Views.FooterView();
}

export function setCurrentPageView(view: View) {
  AppStore.currentPageView = view;
}

export function getCurrentPageView(): View {
  return AppStore.currentPageView;
}