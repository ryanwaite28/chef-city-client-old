import { Router } from 'backbone';

import { 
  setCurrentPageView,
  getCurrentPageView,
  getSessionModel,
} from './chamber';

// Pages
import WelcomePageView from './views/page-container/pages/welcome/welcome.page.view';
import SignupPageView from './views/page-container/pages/signup/signup.page.view';
import SigninPageView from './views/page-container/pages/signin/signin.page.view';



const AppRouter = Router.extend({

  routes: {
    "": "welcome",
    "signup": "signup",
    "signin": "signin",
    "home": "home",
  },

  initialize() {
    const currentPageView = new WelcomePageView();
    setCurrentPageView(currentPageView);
  },

  welcome() {
    console.log('navigating to: /');
    const currentPageView = new WelcomePageView();
    setCurrentPageView(currentPageView);
  },

  signup() {
    console.log('navigating to: /signup');
    const currentPageView = new SignupPageView();
    setCurrentPageView(currentPageView);
  },

  signin() {
    console.log('navigating to: /signin');
    const currentPageView = new SigninPageView();
    setCurrentPageView(currentPageView);
  },

  home() {
    console.log('navigating to: /home');
    const sessionModel = getSessionModel();
    
    if (sessionModel.get('online')) {
      console.log('is online');

    } else {
      console.log('is not online');
      this.navigate('#/signin');
    }
  },

});

export default AppRouter;