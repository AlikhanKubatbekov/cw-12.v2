import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import { fetchRecipes } from './recipesThunk';
import { selectFetchRecipesError, selectRecipes } from './recipesSlice';
import { Grid, Typography } from '@mui/material';
import RecipesItem from './RecipesItem';

const Recipes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const recipesData = useAppSelector(selectRecipes);
  const fetchRecipesError = useAppSelector(selectFetchRecipesError);

  let recipes: React.ReactNode;

  switch (true) {
    case recipesData.length > 0:
      recipes = (
        <Grid container spacing={4} marginBottom="40px">
          {recipesData.map((photo) => (
            <RecipesItem
              key={photo._id}
              _id={photo._id}
              author={photo.user.displayName}
              authorId={photo.user._id}
              title={photo.title}
              image={photo.image}
            />
          ))}
        </Grid>
      );
      break;

    case fetchRecipesError && recipesData.length === 0:
      recipes = (
        <Typography paragraph variant="h4">
          {fetchRecipesError.error}
        </Typography>
      );
      break;

    default:
      recipes = (
        <Typography paragraph variant="h4">
          There is not one recipe at the moment...
        </Typography>
      );
      break;
  }

  return <>{recipes}</>;
};

export default Recipes;
