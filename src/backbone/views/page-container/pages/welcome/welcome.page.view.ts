import { View, Model } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './welcome.page.view.html';
import { get_random_recipes } from '../../../../client';

import Models from '../../../../models/_main';
import Collections from '../../../../collections/_main';
import Views from '../../../../views/_main';

const WelcomePageView = View.extend({
  
  tagName: 'app-welcome',
  template: template(HtmlTemplate),
  recipes: [],

  initialize() {
    this.recipesCollections = new Collections.RecipesCollection([]);
    get_random_recipes().then(resp => {
      console.log(resp);
      this.recipes = resp.recipes;
      this.recipes.forEach((recipe: any) => {
        const recipeModel = new Models.RecipeModel(recipe);
        this.recipesCollections.add(recipeModel);
      });
      // console.log(this);
      this.render();
    });
  },

  removeView() {
    this.$el.remove();
  },

  addRecipeToView(recipeModel: Model) {
    const recipeView = new Views.RecipeView({ model: recipeModel });
    this.$el.find('#recipes-container').append(recipeView.render().el);
  },

  render() {
    const html = this.template({ recipes: this.recipes });
    this.$el.html(html);
    this.recipesCollections.each(this.addRecipeToView, this);
    return this;
  }

});

export default WelcomePageView;