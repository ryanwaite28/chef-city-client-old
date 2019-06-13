import { Model } from 'backbone';

const UserModel: Model = Model.extend({

  defaults: {
    icon_link: ''
  }

});

export default UserModel;