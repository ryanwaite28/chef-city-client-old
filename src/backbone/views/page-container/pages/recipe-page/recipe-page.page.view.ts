import { View, Model } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './recipe-page.page.view.html';
import { disable_buttons, enable_buttons, flash_message } from '../../../../vault';
import { getAppRouter, setCurrentPageView } from '../../../../chamber';
import { get_recipe_by_id } from '../../../../client';
import Models from '../../../../models/_main';
import Views from '../../../../views/_main';

const RecipePageView = View.extend({
  
  tagName: 'app-recipe',
  template: template(HtmlTemplate),
  recipeModel: null,
  recipeView: null,

  initialize() {
    const router = getAppRouter();
    const current = router.current();
    const id = parseInt(current.params[0]);
    get_recipe_by_id(id).then(resp => {
      if (resp.recipe) {
        console.log(`recipe exists`, resp.recipe);
        this.recipeModel = new Models.RecipeModel(resp.recipe);
        this.recipeView = new Views.RecipeView({ model: this.recipeModel });
        this.render();
        this.bindEvents();
        console.log(this);
        
      } else {
        console.log(`no recipe exists with id: ${id}. redirecting...`);
        router.navigate(`#/`);
      }
    });
  },

  bindEvents() {
    
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const html = this.template();
    this.$el.html(html);

    this.$el.find('#recipe-container').append(this.recipeView.el);

    return this;
  },

});

export default RecipePageView;