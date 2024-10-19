import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GlobalError, Recipe, ValidationError } from '../../types';
import {
  createRecipe,
  fetchAuthorById,
  fetchRecipes,
  fetchRecipesByUser,
  removeRecipe,
  removeRecipeByAuthor,
} from './recipesThunk';

interface RecipesState {
  items: Recipe[];
  itemsByAuthor: Recipe[];
  author: { displayName: string; avatar: string | null } | null;
  createRecipeLoading: boolean;
  fetchRecipesLoading: boolean;
  fetchRecipesByAuthorLoading: boolean;
  fetchAuthorLoading: boolean;
  createRecipeError: ValidationError | null;
  fetchRecipesError: GlobalError | null;
  fetchRecipesByUserError: GlobalError | null;
  removeRecipeLoading: boolean;
}

const initialState: RecipesState = {
  items: [],
  itemsByAuthor: [],
  author: null,
  createRecipeLoading: false,
  fetchRecipesLoading: false,
  fetchRecipesByAuthorLoading: false,
  fetchAuthorLoading: false,
  createRecipeError: null,
  fetchRecipesError: null,
  fetchRecipesByUserError: null,
  removeRecipeLoading: false,
};

export const recipesSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.createRecipeLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.createRecipeLoading = false;
      })
      .addCase(createRecipe.rejected, (state, { payload: error }) => {
        state.createRecipeLoading = false;
        state.createRecipeError = error || null;
      });

    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.fetchRecipesLoading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload: recipes }) => {
        state.fetchRecipesLoading = false;
        state.items = recipes;
      })
      .addCase(fetchRecipes.rejected, (state, { payload: error }) => {
        state.fetchRecipesLoading = false;
        if (error) state.items = [];
        state.fetchRecipesError = error || null;
      });

    builder
      .addCase(fetchRecipesByUser.pending, (state) => {
        state.fetchRecipesByAuthorLoading = true;
      })
      .addCase(fetchRecipesByUser.fulfilled, (state, { payload: recipes }) => {
        state.fetchRecipesByAuthorLoading = false;
        state.itemsByAuthor = recipes;
      })
      .addCase(fetchRecipesByUser.rejected, (state, { payload: error }) => {
        state.fetchRecipesByAuthorLoading = false;
        if (error) state.itemsByAuthor = [];
        state.fetchRecipesByUserError = error || null;
      });

    builder
      .addCase(fetchAuthorById.pending, (state) => {
        state.fetchAuthorLoading = true;
      })
      .addCase(fetchAuthorById.fulfilled, (state, { payload: author }) => {
        state.fetchAuthorLoading = false;
        state.author = author;
      })
      .addCase(fetchAuthorById.rejected, (state) => {
        state.fetchAuthorLoading = false;
      });

    builder
      .addCase(removeRecipe.pending, (state) => {
        state.removeRecipeLoading = true;
      })
      .addCase(removeRecipe.fulfilled, (state) => {
        state.removeRecipeLoading = false;
      })
      .addCase(removeRecipe.rejected, (state) => {
        state.removeRecipeLoading = false;
      });

    builder
      .addCase(removeRecipeByAuthor.pending, (state) => {
        state.removeRecipeLoading = true;
      })
      .addCase(removeRecipeByAuthor.fulfilled, (state) => {
        state.removeRecipeLoading = false;
      })
      .addCase(removeRecipeByAuthor.rejected, (state) => {
        state.removeRecipeLoading = false;
      });
  },
});

export const recipesReducer = recipesSlice.reducer;

export const selectRecipes = (state: RootState) => state.recipes.items;
export const selectAuthor = (state: RootState) => state.recipes.author;

export const selectCreateRecipeLoading = (state: RootState) => state.recipes.createRecipeLoading;
export const selectRecipesByAuthor = (state: RootState) => state.recipes.itemsByAuthor;
export const selectRecipesFetchLoading = (state: RootState) => state.recipes.fetchRecipesLoading;
export const selectRecipesByAuthorFetchLoading = (state: RootState) => state.recipes.fetchRecipesByAuthorLoading;
export const selectFetchAuthorLoading = (state: RootState) => state.recipes.fetchAuthorLoading;
export const selectRemoveRecipeLoading = (state: RootState) => state.recipes.removeRecipeLoading;

export const selectCreateRecipeError = (state: RootState) => state.recipes.createRecipeError;
export const selectFetchRecipesByAuthorError = (state: RootState) => state.recipes.fetchRecipesByUserError;
export const selectFetchRecipesError = (state: RootState) => state.recipes.fetchRecipesError;
