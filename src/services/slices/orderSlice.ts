import {
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '../../utils/burger-api';

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

export interface IOrders {
  isLoading: boolean;
  orders: TOrder[];
  oneOrder: TOrder | null;
}

export const initialState: IOrders = {
  isLoading: false,
  orders: [],
  oneOrder: null
};

export const fetchOrders = createAsyncThunk('orders/getAll', getOrdersApi);

export const fetchOrderByNumber = createAsyncThunk(
  'order/getOne',
  getOrderByNumberApi
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => {
    const response = orderBurgerApi(data);
    return response;
  }
);

const OrderSlice = createSlice({
  name: 'order',

  initialState,

  reducers: {
    clearOrder: (state) => {
      state.oneOrder = null;
    }
  },

  selectors: {
    getLoading: (state) => state.isLoading,
    getOrders: (state) => state.orders,
    getOrderData: (state) => state.oneOrder
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });

    builder.addCase(fetchOrderByNumber.pending, (state) => {
      state.isLoading = true;
      state.oneOrder = null;
    }),
      builder.addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoading = false;
        state.oneOrder = null;
      }),
      builder.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.oneOrder = action.payload.orders[0];
      });

    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.oneOrder = action.payload.order;
      });
  }
});

export const { clearOrder } = OrderSlice.actions;

export const { getLoading, getOrders, getOrderData } = OrderSlice.selectors;

export const order = OrderSlice.reducer;
