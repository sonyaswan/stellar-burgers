//список заказов пользователя

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import { getOrders, fetchOrders } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
