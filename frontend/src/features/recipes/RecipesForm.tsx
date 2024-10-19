import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { RecipeMutation } from '../../types';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import SendIcon from '@mui/icons-material/Send';
import { theme } from '../../constants';
import { selectCreateRecipeError } from './recipesSlice';
import { createRecipe } from './recipesThunk';

const RecipesForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<RecipeMutation>({
    title: '',
    recipe: '',
    image: null,
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const createError = useAppSelector(selectCreateRecipeError);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      createRecipe({
        title: state.title.trim(),
        recipe: state.recipe.trim(),
        image: state.image,
      }),
    ).unwrap();
    navigate(`/users/${user?._id}`);
  };

  const getFieldError = (fieldName: string) => {
    try {
      return createError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="div" maxWidth="md">
      <Typography component="h2" variant="h4">
        Add new recipe
      </Typography>
      <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Title"
              name="title"
              autoComplete="off"
              value={state.title}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              type="text"
              rows={4}
              maxRows={8}
              label="Recipe"
              name="recipe"
              autoComplete="off"
              value={state.recipe}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('recipe'))}
              helperText={getFieldError('recipe')}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} endIcon={<SendIcon />}>
          Send
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              component={Link}
              variant="contained"
              to={`/users/${user?._id}`}
              sx={{
                [theme.breakpoints.only('xs')]: {
                  width: '100%',
                },
              }}
            >
              Back to main
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesForm;
