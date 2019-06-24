import { View } from 'backbone';
import { template } from 'underscore';
import * as $ from "jquery";

import { sign_out } from '../../client';
import { 
  flash_message,
  disable_buttons,
  enable_buttons,
} from '../../vault';
import { 
  getAppRouter,
  setSessionModel,
} from '../../chamber';

import HtmlTemplate from './navbar.view.html';

const NavbarView = View.extend({
  
  tagName: 'app-nav',
  template: template(HtmlTemplate),

  initialize() {
    window.document.body.appendChild(this.el);
    this.render();
    this.bindEvents();

    this.model.on('change', this.onChange, this);
    this.model.on('destroy', this.removeView, this);
  },

  bindEvents() {
    this.$el.on('click', '#logout-btn', this.logout);
  },

  destroyModel() {
    this.model.destroy();
  },

  removeView() {
    this.$el.remove();
  },

  onChange() {
    this.render();
  },

  render() {
    const data = this.model.toJSON();
    const html = $(this.template(data));
    this.$el.html(html);
    return this;
  },

  logout() {
    disable_buttons();
    sign_out().then(resp => {
      // console.log(resp);
      flash_message(resp.message, 'success');
      setTimeout(() => {
        setSessionModel(resp);
        const router = getAppRouter();
        enable_buttons();
        router.navigate('#/');
      }, 1000);
    })
  },

});

export default NavbarView;