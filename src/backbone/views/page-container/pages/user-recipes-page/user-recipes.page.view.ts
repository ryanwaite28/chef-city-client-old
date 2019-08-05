import { View } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './user-recipes.page.view.html';
import {
  get_user_by_id,
  get_user_recipes,
} from '../../../../client';
import { 
  getAppRouter,
  numberRegex,
} from '../../../../chamber';
import Models from '../../../../models/_main';
import Views from '../../../../views/_main';

const UserRecipesPageView = View.extend({
  
  tagName: 'app-user',
  template: template(HtmlTemplate),
  minRecipeId: null,

  recipes: new Map(),
  recipeModels: new Map(),
  recipeViews: new Map(),
  endReached: false,

  user: null,

  initialize() {
    const router = getAppRouter();
    const current = router.current();
    const id = parseInt(current.params[0]);
    get_user_by_id(id).then(resp => {
      if (!resp.user) {
        router.navigate('#/');
        return;
      } else {
        this.user = resp.user;
        this.loadUserRecipes().then(() => {
          this.render();
          this.bindEvents();
        });
      }
    });
  },

  bindEvents() {
    
  },

  loadUserRecipes() {
    const idList: number[] = [];
    this.recipes.forEach((key: any, value: any, map: any) => { idList.push(value.id); });
    const minRecipeId = Math.min(...idList);
    this.minRecipeId = minRecipeId === Infinity ? null : minRecipeId;
    return get_user_recipes(this.user.id, this.minRecipeId).then((resp: any) => {
      resp.recipes.forEach((recipe: any) => {
        const recipeModel = new Models.RecipeModel(recipe);
        const recipeView = new Views.RecipeView({ model: recipeModel });

        this.recipes.set(recipe.id, recipe);
        this.recipeModels.set(recipe.id, recipeModel);
        this.recipeViews.set(recipe.id, recipeView);
      });
      
      if (resp.recipes.length < 5) {
        this.endReached = true;
      }
    });
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const data = this.model.toJSON();
    const obj = { 
      ...data, 
      user: this.user, 
      recipesLength: this.recipes.size,
      endReached: this.endReached,
    };
    const html = this.template(obj);
    this.$el.html(html);

    this.recipeViews.forEach((value: any, key: any) => {
      this.$el.find('#recipes-container').append(value.el);
    });
    
    return this;
  },

});

export default UserRecipesPageView;