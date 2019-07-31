import { View } from 'backbone';
import { template } from 'underscore';

import { sign_up } from '../../../../client';
import { 
  flash_message,
  enable_buttons,
  disable_buttons,
} from '../../../../vault';
import { 
  getAppRouter,
  setSessionModel,
} from '../../../../chamber';

import HtmlTemplate from './signup.page.view.html';

const SignupPageView = View.extend({
  
  tagName: 'app-signup',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    this.$el.on('submit', '#signup-form', this.signup);
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const html = this.template();
    this.$el.html(html);
    return this;
  },

  signup: function(evt: any) {
    // console.log(evt);
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const form = evt.target;
    const data = {
      displayname: form.elements['displayname'].value,
      username: form.elements['username'].value,
      email: form.elements['email'].value,
      password: form.elements['password'].value,
      confirmPassword: form.elements['confirmpassword'].value,
    };

    // return console.log(data);
    disable_buttons();
    sign_up(data).then(resp => {
      // console.log(resp);
      if (resp.error) {
        enable_buttons();
        flash_message(resp.message);
        return;
      }
      
      flash_message(resp.message, 'success');
      setTimeout(() => {
        setSessionModel(resp);
        const router = getAppRouter();
        const route = `#/users/${resp.user.id}`;
        router.navigate(route);
      }, 1000);
    });
  },

});

export default SignupPageView;