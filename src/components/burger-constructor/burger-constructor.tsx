//отображение выбранных элементов в бургере, итоговой суммы и кнопка заказа

import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';

import {
  getBurgerItems,
  removeAllIngredients
} from '../../services/slices/burgerSlice';
import {
  getLoading,
  getOrderData,
  createOrder,
  clearOrder
} from '../../services/slices/orderSlice';
import { getIsAuth } from '../../services/slices/userSlice';

import { appPath } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getBurgerItems);

  const orderRequest = useSelector(getLoading);

  const orderModalData = useSelector(getOrderData);

  const authUser = useSelector(getIsAuth);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!authUser) {
      navigate(appPath.login);
    }

    const order: string[] = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map(
        (ingredient: { _id: string }) => ingredient._id
      ),
      constructorItems.bun!._id
    ];

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(removeAllIngredients());
    navigate(appPath.main);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
