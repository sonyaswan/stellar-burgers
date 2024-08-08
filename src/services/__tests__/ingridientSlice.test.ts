import {
  ingridients,
  fetchIngredient,
  initialState
} from '../slices/ingridientSlice';

import { INGREDIENTS } from '../__mock_data__/mockData';

describe('3. редьюсеры ingridientSlice extraReducers', () => {
  it('3/1. fetchIngredient.pending', () => {
    const stateTest = ingridients(initialState, fetchIngredient.pending(''));
    expect(stateTest.isLoading).toBe(true);
  });

  it('3/2. fetchIngredient.rejected', () => {
    const errorTest = new Error('test error');
    const stateTest = ingridients(
      { ...initialState, isLoading: true },
      fetchIngredient.rejected(errorTest, '')
    );
    expect(stateTest.isLoading).toBe(false);
  });

  it('3/3. fetchIngredient.fulfilled', () => {
    const stateTest = ingridients(
      { ...initialState, isLoading: true },
      fetchIngredient.fulfilled(INGREDIENTS, '')
    );
    expect(stateTest.isLoading).toBe(false);
    expect(stateTest.ingredients).toEqual(INGREDIENTS);
  });
});
