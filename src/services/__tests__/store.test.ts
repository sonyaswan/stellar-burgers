import { rootReducer, store } from '../store';

describe('1. Проверяем правильную инициализацию rootReducer', () => {
  const storeRes = rootReducer(undefined, { type: 'ACTION' });
  const storeState = store.getState();

  it('1/1. состояние хранилища', () => {
    expect(storeRes).toEqual(storeState);
  });

  it('1/2. все редьюсеры', () => {
    const reducers = Object.keys(storeState);

    reducers.forEach((reducer) => {
      expect(storeRes).toHaveProperty(reducer);
    });
  });
});
