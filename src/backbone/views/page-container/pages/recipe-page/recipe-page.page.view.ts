import { View, Model } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './recipe-page.page.view.html';
import { disable_buttons, enable_buttons, flash_message } from '../../../../vault';
import { getAppRouter, setCurrentPageView } from '../../../../chamber';
import { get_recipe_by_id } from '../../../../client';
import Models from '../../../../models/_main';

const RecipePageView = View.extend({
  
  tagName: 'app-recipe',
  template: template(HtmlTemplate),

  initialize() {
    const router = getAppRouter();
    const current = router.current();
    const id = parseInt(current.params[0]);
    get_recipe_by_id(id).then(resp => {
      if (resp.recipe) {
        console.log(`recipe exists`, resp.recipe);
        const recipeModel: Model = new Models.RecipeModel(resp.recipe);
        this.model = recipeModel;
        this.render();
        this.bindEvents();
        console.log(this);
        
      } else {
        console.log(`no recipe exists with id: ${id}. redirecting...`);
        router.navigate(`#/home`);
      }
    });
  },

  bindEvents() {
    
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const data = this.model.toJSON();
    const html = this.template(data);
    this.$el.html(html);
    return this;
  },

});

export default RecipePageView;