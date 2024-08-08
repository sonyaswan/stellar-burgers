import { ingridients, fetchIngredient } from '../slices/ingridientSlice';

import { INGREDIENTS } from '../__mock_data__/mockData';

describe('3. редьюсеры ingridientSlice extraReducers', () => {
  it('3/1. fetchIngredient.pending', () => {
    const initialState = {
      ingredients: [],
      isLoading: false
    };
    const stateTest = ingridients(initialState, fetchIngredient.pending(''));

    expect(stateTest.isLoading).toBe(true);
  });

  it('3/2. fetchIngredient.rejected', () => {
    const initialState = {
      ingredients: [],
      isLoading: true
    };
    const errorTest = new Error('test error');
    const stateTest = ingridients(
      initialState,
      fetchIngredient.rejected(errorTest, '')
    );
    expect(stateTest.isLoading).toBe(false);
  });

  it('3/3. fetchIngredient.fulfilled', () => {
    const initialState = {
      ingredients: [],
      isLoading: true
    };

    const stateTest = ingridients(
      initialState,
      fetchIngredient.fulfilled(INGREDIENTS, '')
    );

    expect(stateTest.isLoading).toBe(false);
    expect(stateTest.ingredients).toEqual(INGREDIENTS);
  });
});