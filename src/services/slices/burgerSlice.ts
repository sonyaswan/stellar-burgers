import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '@utils-types';

export interface IBurger {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: IBurger = {
  bun: null,
  ingredients: []
};

export type TIngredientMove = {
  index: number;
  direction: 'up' | 'down';
};

const BurgerSlice = createSlice({
  name: 'constructorBurger',

  initialState,

  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },

    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    removeOneIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient: TConstructorIngredient) => ingredient.id !== payload.id
      );
    },

    removeAllIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    moveIngredient: (state, { payload }: PayloadAction<TIngredientMove>) => {
      const directionNumber = payload.direction === 'up' ? 1 : -1;
      const elementToMOve = state.ingredients[payload.index];
      const elementNeighbour =
        state.ingredients[payload.index - directionNumber];
      state.ingredients[payload.index] = elementNeighbour;
      state.ingredients[payload.index - directionNumber] = elementToMOve;
    }
  },

  selectors: {
    getBurgerItems: (state) => state
  }
});

export const {
  addBun,
  addIngredient,
  removeOneIngredient,
  removeAllIngredients,
  moveIngredient
} = BurgerSlice.actions;

export const { getBurgerItems } = BurgerSlice.selectors;

export const constructorBurger = BurgerSlice.reducer;
