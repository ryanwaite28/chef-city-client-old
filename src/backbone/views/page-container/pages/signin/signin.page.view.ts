import { View } from 'backbone';
import { template } from 'underscore';

import { sign_in } from '../../../../client';
import { 
  flash_message,
  enable_buttons,
  disable_buttons,
} from '../../../../vault';
import { 
  getAppRouter,
  setSessionModel,
} from '../../../../chamber';

import HtmlTemplate from './signin.page.view.html';

const SigninPageView = View.extend({
  
  tagName: 'div',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    this.$el.on('submit', '#signin-form', this.signin);
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const html = this.template();
    this.$el.html(html);
    return this;
  },

  signin: function(evt: any) {
    console.log(evt);
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const form = evt.target;
    const data = {
      email: form.elements['email'].value,
      password: form.elements['password'].value,
    };

    // return console.log(data);
    disable_buttons();
    sign_in(data).then(resp => {
      // console.log(resp);
      if (resp.error) {
        enable_buttons();
        flash_message(resp.message, 'danger');
        return;
      }
      
      flash_message(resp.message, 'success');
      setTimeout(() => {
        let sessionObj;
        if (resp.user) {
          const user = { ...resp.user };
          delete resp.user;
          sessionObj = { ...resp, ...user }
        } else {
          sessionObj = { ...resp }
        }
        setSessionModel(sessionObj);
        const router = getAppRouter();
        router.navigate('#/home');
      }, 1000);
    });
  },

});

export default SigninPageView;