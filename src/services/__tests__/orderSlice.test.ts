import {
  order,
  clearOrder,
  fetchOrders,
  fetchOrderByNumber,
  createOrder
} from '../slices/orderSlice';

const oneOrderMock = {
  _id: '1',
  status: 'string',
  name: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  number: 1,
  ingredients: ['1', '2', '3']
};

const ordersMock = [
  oneOrderMock,
  { ...oneOrderMock, number: 2 },
  { ...oneOrderMock, number: 3 }
];

export const initialStateNull = {
  isLoading: false,
  orders: [],
  oneOrder: null
};

export const initialStateNotNull = {
  isLoading: false,
  orders: ordersMock,
  oneOrder: oneOrderMock
};

describe('6. редьюсеры fetchFeeds extraReducers', () => {
  it('6/1 clearOrder', () => {
    const stateTest = order(initialStateNotNull, clearOrder());
    expect(stateTest.oneOrder).toBe(null);
  });

  describe('6/2. extraReducers fetchOrders', () => {
    it('6/2/1. pending', () => {
      const stateTest = order(initialStateNull, fetchOrders.pending(''));
      expect(stateTest.isLoading).toBe(true);
    });

    it('6/2/2. rejected', () => {
      const errorTest = new Error('test error');
      const stateTest = order(
        { ...initialStateNull, isLoading: true },
        fetchOrders.rejected(errorTest, '')
      );
      expect(stateTest.isLoading).toBe(false);
    });

    it('6/2/3. fulfilled', () => {
      const stateTest = order(
        { ...initialStateNull, isLoading: true },
        {
          type: fetchOrders.fulfilled.type,
          payload: ordersMock
        }
      );

      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.orders).toEqual(ordersMock);
    });
  });

  describe('6/2. extraReducers fetchOrderByNumber', () => {
    it('6/2/1. pending', () => {
      const stateTest = order(
        initialStateNotNull,
        fetchOrderByNumber.pending('', 1)
      );
      expect(stateTest.isLoading).toBe(true);
      expect(stateTest.oneOrder).toBe(null);
    });

    it('6/2/2. rejected', () => {
      const errorTest = new Error('test error');
      const stateTest = order(
        { ...initialStateNotNull, isLoading: true },
        fetchOrderByNumber.rejected(errorTest, '', 1)
      );
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.oneOrder).toBe(null);
    });

    it('6/2/3. fulfilled', () => {
      const stateTest = order(
        { ...initialStateNull, isLoading: true },
        {
          type: fetchOrderByNumber.fulfilled.type,
          payload: { orders: [oneOrderMock] }
        }
      );

      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.oneOrder).toEqual(oneOrderMock);
    });
  });

  describe('6/2. extraReducers createOrder', () => {
    it('6/2/1. pending', () => {
      const stateTest = order(initialStateNull, {
        type: createOrder.pending.type
      });
      expect(stateTest.isLoading).toBe(true);
    });

    it('6/2/2. rejected', () => {
      const stateTest = order(
        { ...initialStateNull, isLoading: true },
        {
          type: createOrder.rejected.type
        }
      );
      expect(stateTest.isLoading).toBe(false);
    });

    it('6/2/3. fulfilled', () => {
      const stateTest = order(
        { ...initialStateNull, isLoading: true },
        {
          type: createOrder.fulfilled.type,
          payload: { order: oneOrderMock }
        }
      );

      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.oneOrder).toEqual(oneOrderMock);
    });
  });
});
