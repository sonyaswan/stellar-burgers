//шапка приложения

import { FC } from 'react';
import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserData);
  return <AppHeaderUI userName={userName?.name || ''} />;
};
