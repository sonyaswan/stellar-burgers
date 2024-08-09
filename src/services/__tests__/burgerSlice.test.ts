import {
  IBurger,
  initialState as initialStateNull,
  constructorBurger,
  getBurgerItems,
  addIngredient,
  removeOneIngredient,
  removeAllIngredients,
  moveIngredient
} from '../slices/burgerSlice';

import {
  BUN,
  BUN_CONSTRUCTOR,
  INGREDIENTS_CONSTRUCTOR
} from '../__mock_data__/mockData';

const ONE_INGREDIENT = INGREDIENTS_CONSTRUCTOR[0];

const initialStateNotNull = {
  bun: BUN_CONSTRUCTOR,
  ingredients: INGREDIENTS_CONSTRUCTOR
};

describe('2. Проверяем редьюсер слайса BurgerSlice', () => {
  it('2/1. обработка экшена добавления ингредиента addIngredient - добавляем булку', () => {
    const stateTest = constructorBurger(initialStateNull, addIngredient(BUN));
    expect(stateTest.bun?._id).toBe(BUN._id);
  });

  it('2/2. обработка экшена добавления ингредиента addIngredient - любой другой ингредиент', () => {
    const stateTest = constructorBurger(
      initialStateNull,
      addIngredient(ONE_INGREDIENT)
    );
    expect(stateTest.ingredients[0]._id).toBe(ONE_INGREDIENT._id);
  });

  it('2/3. обработка экшена удаления ингредиента removeOneIngredient', () => {
    const stateTest = constructorBurger(
      initialStateNotNull,
      removeOneIngredient(ONE_INGREDIENT)
    );
    expect(stateTest.ingredients).toHaveLength(
      INGREDIENTS_CONSTRUCTOR.length - 1
    );
  });

  it('2/4. обработка экшена удаления всех ингридиентов removeAllIngredients', () => {
    const stateTest = constructorBurger(
      initialStateNotNull,
      removeAllIngredients()
    );
    expect(stateTest.ingredients).toHaveLength(0);
    expect(stateTest.bun).toBe(null);
  });

  it('2/5. обработка экшена изменения порядка ингредиентов в начинке moveIngredient', () => {
    const stateUp = constructorBurger(
      initialStateNotNull,
      moveIngredient({
        index: 1,
        direction: 'up'
      })
    );

    const stateUpFirst = constructorBurger(
      initialStateNotNull,
      moveIngredient({
        index: 0,
        direction: 'up'
      })
    );

    const stateDown = constructorBurger(
      initialStateNotNull,
      moveIngredient({
        index: 1,
        direction: 'down'
      })
    );

    const lastIndex = INGREDIENTS_CONSTRUCTOR.length - 1;

    const stateDownLast = constructorBurger(
      initialStateNotNull,
      moveIngredient({
        index: lastIndex,
        direction: 'down'
      })
    );

    expect(stateUp.ingredients[1].id).toBe(INGREDIENTS_CONSTRUCTOR[0].id);
    expect(stateUp.ingredients[0].id).toBe(INGREDIENTS_CONSTRUCTOR[1].id);

    expect(stateUpFirst.ingredients[0].id).toBe(INGREDIENTS_CONSTRUCTOR[0].id);

    expect(stateDown.ingredients[1].id).toBe(INGREDIENTS_CONSTRUCTOR[2].id);
    expect(stateDown.ingredients[2].id).toBe(INGREDIENTS_CONSTRUCTOR[1].id);

    expect(stateDownLast.ingredients[lastIndex].id).toBe(
      INGREDIENTS_CONSTRUCTOR[lastIndex].id
    );
  });
});
