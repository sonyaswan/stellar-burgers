import { getIngredientsApi } from '../../utils/burger-api';

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '@utils-types';

export interface IIngridients {
  ingredients: TIngredient[];
  isLoading: Boolean;
}

export const initialState: IIngridients = {
  ingredients: [],
  isLoading: false
};

export const fetchIngredient = createAsyncThunk(
  'ingredient/getAll',
  getIngredientsApi
);

const IngridientsSlice = createSlice({
  name: 'ingridients',

  initialState,

  reducers: {},

  selectors: {
    getIsLoading: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients,
    getIngredientById: (state, id: string | undefined) =>
      state.ingredients.find((ingredient) => ingredient._id === id)
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIngredient.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchIngredient.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(fetchIngredient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIsLoading, getIngredients, getIngredientById } =
  IngridientsSlice.selectors;

export const ingridients = IngridientsSlice.reducer;
