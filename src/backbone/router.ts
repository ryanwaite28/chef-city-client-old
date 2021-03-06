import { Router, history, View } from 'backbone';
import { pairs, find, isRegExp } from 'underscore';

import { 
  setCurrentPageView,
  getSessionModel,
} from './chamber';

import {
  get_recipe_by_id,
} from './client';

import Models from './models/_main';

// Pages
import WelcomePageView from './views/page-container/pages/welcome/welcome.page.view';
import SignupPageView from './views/page-container/pages/signup/signup.page.view';
import SigninPageView from './views/page-container/pages/signin/signin.page.view';
import UserPageView from './views/page-container/pages/user-page/user.page.view';
import CreateRecipePageView from './views/page-container/pages/create-recipe/create-recipe.page.view';
import RecipePageView from './views/page-container/pages/recipe-page/recipe-page.page.view';
import SettingsPageView from './views/page-container/pages/settings/settings.page.view';
import UserRecipesPageView from './views/page-container/pages/user-recipes-page/user-recipes.page.view';


const AppRouter = Router.extend({

  routes: {
    "": "welcome",
    "signup": "signup",
    "signin": "signin",
    "users/:id": "userPage",
    "users/:id/recipes": "userRecipesPage",
    "users/:id/settings": "settingsPage",
    "create-recipe": "createRecipe",
    "recipes/:id": "recipePage",
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

  userPage() {
    const sessionModel = getSessionModel();
    
    const currentPageView = new UserPageView({ model: sessionModel });
    setCurrentPageView(currentPageView);
  },

  userRecipesPage() {
    const sessionModel = getSessionModel();
    
    const currentPageView = new UserRecipesPageView({ model: sessionModel });
    setCurrentPageView(currentPageView);
  },

  createRecipe() {
    // console.log('navigating to: /create-recipe');
    const sessionModel = getSessionModel();
    
    if (sessionModel.get('session').online) {
      // console.log('is online');
      const currentPageView = new CreateRecipePageView({ model: sessionModel });
      setCurrentPageView(currentPageView);
    } else {
      // console.log('is not online');
      this.navigate('/#/signin');
    }
  },

  recipePage() {
    const sessionModel = getSessionModel();
    // const current = this.current();
    // const id = parseInt(current.params[0]);
    // get_recipe_by_id(id).then(resp => {
    //   if (resp.recipe) {
    //     console.log(`recipe exists`, resp.recipe);
    //     const recipeModel: Model = new Models.RecipeModel(resp.recipe);
    //     const currentPageView: View = new RecipePageView({ model: recipeModel });
    //     setCurrentPageView(currentPageView);
    //   } else {
    //     console.log(`no recipe exists with id: ${id}. redirecting...`);
    //     this.navigate(`#/home`);
    //   }
    // });

    const currentPageView: View = new RecipePageView({ model: sessionModel });
    setCurrentPageView(currentPageView);
  },

  settingsPage() {
    const sessionModel = getSessionModel();
    const current = this.current();
    const id = parseInt(current.params[0]);
    const shouldDenyAccess = (
      !id ||
      !sessionModel.get('session').online ||
      (
        sessionModel.get('session').online && 
        sessionModel.get('you').id !== id
      )
    );
    if (shouldDenyAccess) {
      this.navigate('/#/signin');
    } else {
      const currentPageView: View = new SettingsPageView({ model: sessionModel });
      setCurrentPageView(currentPageView);
    }
  },

});

export default AppRouter;