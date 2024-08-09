import { getFeedsApi } from '../../utils/burger-api';

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

export interface IFeed {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

export const initialState: IFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const fetchFeeds = createAsyncThunk(
  'getFeedOrdersApi/getFeedsApi',
  getFeedsApi
);

const FeedSlice = createSlice({
  name: 'feed',

  initialState,

  reducers: {},

  selectors: {
    getFeed: (state) => state.orders,
    getTotal: (state) => state.total,
    getTodayTotal: (state) => state.totalToday,
    getLoading: (state) => state.isLoading
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { getFeed, getTodayTotal, getTotal } = FeedSlice.selectors;

export const feed = FeedSlice.reducer;
