//приложение

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';

import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { useEffect } from 'react';

import { useDispatch } from '../../services/store';

import { fetchIngredient } from '../../services/slices/ingridientSlice';
import { fetchUser } from '../../services/slices/userSlice';
import { clearOrder } from '../../services/slices/orderSlice';

import { appPath } from '@utils-types';

appPath.main;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;

  const closeModal = (modalType: 'order' | 'ingridient') => {
    navigate(-1);
    if (modalType === 'order') {
      dispatch(clearOrder());
    }
  };

  useEffect(() => {
    dispatch(fetchIngredient());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path={appPath.main} element={<ConstructorPage />} />
          <Route path={appPath.feed} element={<Feed />} />
          <Route
            path={appPath.login}
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={appPath.register}
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={appPath.forgot}
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={appPath.reset}
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={appPath.profile}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={appPath.orders}
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path={appPath.notFound} element={<NotFound404 />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path={appPath.feedNumber}
              element={
                <Modal
                  title='Информация о заказе'
                  onClose={() => closeModal('order')}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path={appPath.ingredientId}
              element={
                <Modal
                  title='Детали ингредиента'
                  onClose={() => closeModal('ingridient')}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={appPath.ordersNumber}
              element={
                <ProtectedRoute>
                  <Modal
                    title='Информация о заказе'
                    onClose={() => closeModal('order')}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
