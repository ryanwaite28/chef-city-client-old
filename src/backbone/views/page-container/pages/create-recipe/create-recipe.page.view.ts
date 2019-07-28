import { View } from 'backbone';
import { template } from 'underscore';

import { create_recipe } from '../../../../client';

import HtmlTemplate from './create-recipe.page.view.html';
import { disable_buttons, enable_buttons, flash_message } from '../../../../vault';
import { getAppRouter } from '../../../../chamber';

const CreateRecipePageView = View.extend({
  
  tagName: 'app-create-recipe',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    this.$el.on('submit', '#create-recipe-form', this.createRecipe);
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

  createRecipe(evt: MouseEvent) {
    console.log(evt);
    if (evt && evt.preventDefault) {
        evt.preventDefault();
    }

    const form: HTMLFormElement = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    disable_buttons();
    create_recipe(formData).then(resp => {
        console.log(resp);
        if (resp.error) {
            flash_message(resp.message, 'danger');
            enable_buttons();
            return;
        }
        flash_message(resp.message, 'success');
        setTimeout(() => {
            const router = getAppRouter();
            const newRecipePageUrl = `#/recipes/${resp.newRecipe.id}`;
            router.navigate(newRecipePageUrl);
          }, 1000);
    });
  },

});

export default CreateRecipePageView;