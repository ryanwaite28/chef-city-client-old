import { View } from 'backbone';
import { template } from 'underscore';
import * as $ from "jquery";

import HtmlTemplate from './navbar.view.html';

const NavbarView = View.extend({
  
  tagName: 'app-nav',
  template: template(HtmlTemplate),

  initialize() {
    window.document.body.appendChild(this.el);
    this.render();

    this.model.on('change', this.onChange, this);
    this.model.on('destroy', this.removeView, this);
  },

  destroyModel() {
    this.model.destroy();
  },

  removeView() {
    this.$el.remove();
  },

  onChange() {
    // console.log('model changed', this);
    this.render();
  },

  render() {
    const data = this.model.toJSON();
    const html = $(this.template(data));
    this.$el.html(html);
    return this;
  }

});

export default NavbarView;