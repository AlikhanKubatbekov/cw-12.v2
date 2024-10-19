import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAuthorById, fetchRecipesByUser } from '../recipesThunk';
import { selectAuthor, selectFetchRecipesByAuthorError, selectRecipesByAuthor } from '../recipesSlice';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import AuthorRecipeItem from './AuthorRecipeItem';
import { theme } from '../../../constants';
import { selectUser } from '../../users/usersSlice';

const AuthorRecipes = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchAuthorById(id));
      dispatch(fetchRecipesByUser(id));
    }
  }, [id, dispatch]);

  const user = useAppSelector(selectUser);
  const author = useAppSelector(selectAuthor);
  const recipesByAuthor = useAppSelector(selectRecipesByAuthor);
  const recipesByAuthorError = useAppSelector(selectFetchRecipesByAuthorError);

  let recipes: React.ReactNode;

  switch (true) {
    case recipesByAuthor.length > 0 && id !== undefined:
      recipes = (
        <Grid container spacing={4} marginBottom="40px">
          {recipesByAuthor.map((photo) => (
            <AuthorRecipeItem key={photo._id} _id={photo._id} authorId={id} title={photo.title} image={photo.image} />
          ))}
        </Grid>
      );
      break;

    case recipesByAuthorError && recipesByAuthor.length === 0:
      recipes = (
        <Typography paragraph variant="h4">
          {recipesByAuthorError.error}
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

  return (
    <>
      <Typography
        component="div"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        marginBottom="20px"
      >
        <Typography component="h2" variant="h4">
          {author ? author.displayName : 'Anonymous'}'s Recipes
        </Typography>
        {user && user._id === id && (
          <Button
            component={Link}
            variant="contained"
            sx={{
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginTop: '20px',
              },
            }}
            to={`/add-new-recipe`}
          >
            Add new recipe
          </Button>
        )}
      </Typography>
      {recipes}
    </>
  );
};

export default AuthorRecipes;
