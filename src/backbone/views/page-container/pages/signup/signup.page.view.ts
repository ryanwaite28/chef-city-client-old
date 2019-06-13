import { View } from 'backbone';
import { template } from 'underscore';



import HtmlTemplate from './signup.page.view.html';

const SignupPageView = View.extend({
  
  tagName: 'div',
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

export default SignupPageView;