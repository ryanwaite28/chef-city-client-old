import { Model } from 'backbone';

const SessionModel: Model = Model.extend({

  defaults: {
    online: false
  }

});

export default SessionModel;