import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader/preloader';

import { useSelector } from '../../services/store';
import { getIsAuth, getUserData } from '../../services/slices/userSlice';

import { appPath } from '@utils-types';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuth); // селектор получения состояния загрузки пользователя
  const location = useLocation();

  if (!onlyUnAuth && !isAuthChecked) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to={appPath.login} state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && isAuthChecked) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: appPath.main };

    return <Navigate replace to={from} />;
  }

  return children;
};
