import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { AppDispatch } from '../../app/store';
import { GlobalError, Recipe, RecipeMutation, ValidationError } from '../../types';

export const createRecipe = createAsyncThunk<
  void,
  RecipeMutation,
  {
    rejectValue: ValidationError;
  }
>('recipes/create', async (recipeMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(recipeMutation) as (keyof RecipeMutation)[];
    keys.forEach((key) => {
      const value = recipeMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return await axiosApi.post('/recipes', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data.error as ValidationError);
    }

    throw e;
  }
});

export const fetchRecipes = createAsyncThunk<
  Recipe[],
  void,
  {
    rejectValue: GlobalError;
  }
>('recipes/fetchRecipes', async (_, { rejectWithValue }) => {
  try {
    const { data: recipes } = await axiosApi.get<Recipe[]>(`/recipes`);
    return recipes;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const fetchRecipesByUser = createAsyncThunk<Recipe[], string, { rejectValue: GlobalError }>(
  'recipes/fetchRecipesByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data: recipesByUser } = await axiosApi.get<Recipe[]>(`/recipes?user=${userId}`);
      return recipesByUser;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const fetchAuthorById = createAsyncThunk<{ displayName: string; avatar: string | null }, string>(
  'recipes/fetchAuthorByRecipes',
  async (userId): Promise<{ displayName: string; avatar: string | null }> => {
    const response = await axiosApi.get<{ displayName: string; avatar: string | null }>(`/users/${userId}`);
    return response.data;
  },
);

export const removeRecipe = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'recipes/remove',
  async (recipeId, thunkAPI) => {
    await axiosApi.delete(`/recipes/${recipeId}`);
    await thunkAPI.dispatch(fetchRecipes());
  },
);

export const removeRecipeByAuthor = createAsyncThunk<
  void,
  { recipeId: string; userId: string },
  { dispatch: AppDispatch }
>('recipes/removeByAuthor', async ({ recipeId, userId }, thunkAPI) => {
  await axiosApi.delete(`/recipes/${recipeId}`);
  await thunkAPI.dispatch(fetchRecipesByUser(userId));
});
