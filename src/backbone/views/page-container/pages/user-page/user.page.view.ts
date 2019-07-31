import { View } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './user.page.view.html';
import { get_user_by_id } from '../../../../client';
import { 
  getAppRouter,
  numberRegex,
} from '../../../../chamber';

const UserPageView = View.extend({
  
  tagName: 'app-user',
  template: template(HtmlTemplate),

  user: null,

  initialize() {
    const router = getAppRouter();
    const current = router.current();
    const id = parseInt(current.params[0]);
    get_user_by_id(id).then(resp => {
      if (!resp.user) {
        router.navigate('#/');
        return;
      } else {
        this.user = resp.user;
        this.render(resp.user);
        this.bindEvents();
      }
    });
  },

  bindEvents() {
    
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const data = this.model.toJSON();
    const obj = { ...data, user: this.user };
    // console.log(obj);
    
    const html = this.template(obj);
    this.$el.html(html);
    return this;
  },

});

export default UserPageView;