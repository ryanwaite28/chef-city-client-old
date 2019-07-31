import { Collection } from 'backbone';
import RecipeModel from './../models/recipe.model';

const RecipesCollection: Collection = Collection.extend({

  model: RecipeModel

});

export default RecipesCollection;