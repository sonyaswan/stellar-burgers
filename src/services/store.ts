import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingridients } from './slices/ingridientSlice';
import { constructorBurger } from './slices/burgerSlice';
import { user } from './slices/userSlice';
import { order } from './slices/orderSlice';
import { feed } from './slices/feedSlice';

// Заменить на импорт настоящего редьюсера
export const rootReducer = combineReducers({
  ingridients: ingridients,
  constructorBurger: constructorBurger,
  user: user,
  order: order,
  feed: feed
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
