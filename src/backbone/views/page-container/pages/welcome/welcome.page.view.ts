import { View } from 'backbone';
import { template } from 'underscore';



import HtmlTemplate from './welcome.page.view.html';

const WelcomePageView = View.extend({
  
  tagName: 'app-welcome',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const html = this.template();
    this.$el.html(html);
    return this;
  }

});

export default WelcomePageView;