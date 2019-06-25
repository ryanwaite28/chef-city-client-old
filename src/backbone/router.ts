import { Router, history } from 'backbone';
import { pairs, find, isRegExp } from 'underscore';

import { 
  setCurrentPageView,
  getSessionModel,
} from './chamber';

// Pages
import WelcomePageView from './views/page-container/pages/welcome/welcome.page.view';
import SignupPageView from './views/page-container/pages/signup/signup.page.view';
import SigninPageView from './views/page-container/pages/signin/signin.page.view';
import HomePageView from './views/page-container/pages/home/home.page.view';



const AppRouter = Router.extend({

  routes: {
    "": "welcome",
    "signup": "signup",
    "signin": "signin",
    "home": "home",
  },

  initialize() {
    console.log('router initialized.');
  },

  current() {
    // found at: https://stackoverflow.com/questions/7563949/backbone-js-get-current-route
    var Router = this,
      fragment = (<any>history).fragment,
      routes = pairs(Router.routes),
      route = null, params = null, matched;

    matched = find(routes, function(handler) {
      route = isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
      return route.test(fragment);
    });

    if(matched) {
      // NEW: Extracts the params using the internal
      // function _extractParameters 
      params = Router._extractParameters(route, fragment);
      route = matched[1];
    }

    return {
      route,
      fragment,
      params,
    };
  },

  welcome() {
    // console.log('navigating to: /');
    const currentPageView = new WelcomePageView();
    setCurrentPageView(currentPageView);
  },

  signup() {
    // console.log('navigating to: /signup');
    const currentPageView = new SignupPageView();
    setCurrentPageView(currentPageView);
  },

  signin() {
    // console.log('navigating to: /signin');
    const currentPageView = new SigninPageView();
    setCurrentPageView(currentPageView);
  },

  home() {
    // console.log('navigating to: /home');
    const sessionModel = getSessionModel();
    
    if (sessionModel.get('online')) {
      console.log('is online');
      const currentPageView = new HomePageView({ model: sessionModel });
      setCurrentPageView(currentPageView);
    } else {
      console.log('is not online');
      this.navigate('/#/signin');
    }
  },

});

export default AppRouter;