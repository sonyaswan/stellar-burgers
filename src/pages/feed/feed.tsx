//страница с лентой заказов всех

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import { getFeed, fetchFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeed);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  const updateFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateFeeds} />;
};
