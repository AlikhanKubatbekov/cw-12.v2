import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middleware/auth';
import { clearImages, imagesUpload } from '../multer';
import Recipe from '../models/Recipe';
import { Error, Types } from 'mongoose';
import { RecipeMutation, RequestWithUser } from '../types';

const recipesRouter = Router();

recipesRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        const recipeData: RecipeMutation = {
          user: req.user._id,
          title: req.body.title,
          recipe: req.body.recipe,
          image: req.file ? req.file.filename : '',
        };

        const recipe = new Recipe(recipeData);
        await recipe.save();

        return res.status(200).json({ message: 'Successfully created recipe', recipe });
      }
    } catch (e) {
      if (req.file) {
        clearImages(req.file.filename);
      }

      if (e instanceof Error.ValidationError) {
        return res.status(422).json({ error: e });
      }

      return next(e);
    }
  },
);

recipesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.user) {
      const userId = req.query.user as string;

      if (!Types.ObjectId.isValid(userId)) {
        return res.status(404).send({ error: 'Please check the data in your request!' });
      }

      const recipesByUser = await Recipe.find({ user: userId });

      if (!recipesByUser || recipesByUser.length === 0) {
        return res.status(404).send({ error: 'Recipes not found!' });
      }

      return res.status(200).send(recipesByUser);
    } else {
      const recipes = await Recipe.find().populate('user', 'displayName');

      if (!recipes || recipes.length === 0) {
        return res.status(404).send({ error: 'No recipes found!' });
      }

      return res.status(200).send(recipes);
    }
  } catch (e) {
    return next(e);
  }
});

recipesRouter.delete('/:id', auth, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ error: 'Wrong ObjectId!' });
      }

      const recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);

      if (!recipe) return res.status(404).send({ error: 'Recipe not found!' });

      if (recipe.user.toString() === req.user._id.toString() || req.user.role === 'admin') {
        await Recipe.findByIdAndDelete({ _id: recipeId });
        return res.status(200).send({ message: 'Deleted successfully.' });
      } else {
        return res.status(403).send({ error: 'You cannot to remove this recipe!' });
      }
    }
  } catch (e) {
    return next(e);
  }
});

export default recipesRouter;
