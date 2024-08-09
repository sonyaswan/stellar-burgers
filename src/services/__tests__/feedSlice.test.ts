import { feed, fetchFeeds, initialState } from '../slices/feedSlice';

export const ordersData = {
  orders: ['1', '2', '3', '4', '5'],
  total: 5,
  totalToday: 3
};

describe('5. редьюсеры feedSlice extraReducers', () => {
  it('5/1. fetchFeeds.pending', () => {
    const stateTest = feed(initialState, fetchFeeds.pending(''));
    expect(stateTest.isLoading).toBe(true);
  });

  it('5/2. fetchFeeds.rejected', () => {
    const errorTest = new Error('test error');
    const stateTest = feed(initialState, fetchFeeds.rejected(errorTest, ''));
    expect(stateTest.isLoading).toBe(false);
  });

  it('5/3. fetchFeeds.fulfilled', () => {
    const stateTest = feed(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: ordersData
    });

    expect(stateTest.isLoading).toBe(false);
    expect(stateTest.orders).toEqual(ordersData.orders);
    expect(stateTest.total).toBe(ordersData.total);
    expect(stateTest.totalToday).toBe(ordersData.totalToday);
  });
});
