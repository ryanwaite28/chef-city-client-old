import { Model } from 'backbone';

const RecipeModel: Model = Model.extend({

  urlRoot: '/api/recipes',

});

export default RecipeModel;