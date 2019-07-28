import { View, Model } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './recipe-page.page.view.html';
import { disable_buttons, enable_buttons, flash_message } from '../../../../vault';
import { getAppRouter, setCurrentPageView } from '../../../../chamber';
import { get_recipe_by_id } from '../../../../client';
import Models from '../../../../models/_main';

const SearchPageView = View.extend({
  
  tagName: 'app-search',
  template: template(HtmlTemplate),

  initialize() {
    const router = getAppRouter();
    const current = router.current();
  },

  bindEvents() {
    
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    // const data = this.model.toJSON();
    const html = this.template();
    this.$el.html(html);
    return this;
  },

});

export default SearchPageView;