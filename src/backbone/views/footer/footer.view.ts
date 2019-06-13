import { View } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './footer.view.html';

const FooterView = View.extend({
  
  tagName: 'app-footer',
  template: template(HtmlTemplate),

  initialize() {
    window.document.body.appendChild(this.el);
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
    const html = this.template();
    this.$el.html(html);
    return this;
  }

});

export default FooterView;