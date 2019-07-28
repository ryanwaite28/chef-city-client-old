import { View } from 'backbone';
import { template } from 'underscore';



import HtmlTemplate from './home.page.view.html';

const HomePageView = View.extend({
  
  tagName: 'app-home',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
    this.bindEvents();
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

export default HomePageView;