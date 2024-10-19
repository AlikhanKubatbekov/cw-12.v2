import { model, Schema, Types } from 'mongoose';
import User from './User';
import { Recipe } from '../types';

const RecipeSchema = new Schema<Recipe>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (userId: Types.ObjectId) => User.findById(userId),
        message: 'User does not exist',
      },
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Title field is required!'],
    },
    recipe: {
      type: String,
      trim: true,
      required: [true, 'Recipe field is required!'],
    },
    image: {
      type: String,
      trim: true,
      required: [true, 'Image field is required!'],
    },
  },
  {
    versionKey: false,
  },
);

const Recipe = model('Recipe', RecipeSchema);

export default Recipe;
