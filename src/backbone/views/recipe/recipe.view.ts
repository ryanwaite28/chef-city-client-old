import { View } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './recipe.view.html';

const RecipeView = View.extend({
  
  tagName: 'app-recipe',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
  },

  destroyModel() {
    this.model.destroy();
  },

  removeView() {
    this.$el.remove();
  },

  onChange() {
    console.log('model changed', this);
  },

  render() {
    const data = this.model.toJSON();
    const html = this.template(data);
    this.$el.html(html);
    return this;
  }

});

export default RecipeView;