import { View } from 'backbone';
import { template } from 'underscore';
import * as $ from "jquery";
import { 
  getAppRouter,
  getCurrentPageView,
} from '../../chamber';

import HtmlTemplate from './page-container.view.html';

const PageContainerView = View.extend({
  
  tagName: 'app-main',
  template: template(HtmlTemplate),

  initialize() {
    window.document.body.appendChild(this.el);
    this.render();
    this.appRouter = getAppRouter();
    this.appRouter.on('route', this.render, this);
  },

  removeView() {
    this.$el.remove();
  },

  render() {
    const html = $(this.template());
    const currentPageView = getCurrentPageView();
    html.append(currentPageView.$el);
    this.$el.html(html);
    return this;
  }

});

export default PageContainerView;