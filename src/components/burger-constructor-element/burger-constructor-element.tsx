//выбранный ингридиент (кроме булок) в отображении конструтора бургера

import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import { useDispatch } from '../../services/store';
import {
  removeOneIngredient,
  moveIngredient
} from '../../services/slices/burgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredient({ index, direction: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ index, direction: 'up' }));
    };

    const handleClose = () => {
      dispatch(removeOneIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
