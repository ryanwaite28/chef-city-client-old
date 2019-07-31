import { View } from 'backbone';
import { template } from 'underscore';

import HtmlTemplate from './settings.page.view.html';
import { disable_buttons, flash_message, enable_buttons } from '../../../../vault';
import { getAppRouter, setSessionModel } from '../../../../chamber';
import { update_profile_icon } from '../../../../client';

const SettingsPageView = View.extend({
  
  tagName: 'app-settings',
  template: template(HtmlTemplate),

  initialize() {
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    this.$el.on('submit', '#profile-icon-form', this.updateProfileIcon.bind(this));
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

  updateProfileIcon(evt: MouseEvent) {
    console.log(evt, this);
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const data = this.model.toJSON();
    const form: HTMLFormElement = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    disable_buttons();
    update_profile_icon(formData, data.you.id).then(resp => {
      // console.log(resp);
      if (resp.error) {
        flash_message(resp.message, 'danger');
        enable_buttons();
        return;
      }
      flash_message(resp.message, 'success');
      data.you.icon_link = resp.new_icon_link;
      setSessionModel(data);
    });
  },

});

export default SettingsPageView;