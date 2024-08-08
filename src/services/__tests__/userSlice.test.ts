import {
  user,
  fetchUser,
  fetchUpdateUser,
  fetchRegistration,
  fetchLogin,
  fetchLogout,
  initialState as initialStateNull
} from '../slices/userSlice';

const userDataNull = { name: '', email: '' };
const userData = { name: 'test name', email: 'test@test.test' };

const initialStates = [
  {
    ...initialStateNull
  },
  {
    isAuth: false,
    userData: userDataNull,
    isLoading: true
  },
  {
    isAuth: true,
    userData: { name: 'init name', email: 'init@test.test' },
    isLoading: false
  }
];

describe('4. редьюсеры userSlice extraReducers', () => {
  //
  describe('4/1. fetchUser', () => {
    it('4/1/1. pending', () => {
      const stateTest = user(initialStates[0], fetchUser.pending(''));
      expect(stateTest.isLoading).toBe(true);
    });

    it('4/1/2. rejected', () => {
      const errorTest = new Error('test error');
      const stateTest = user(
        initialStates[1],
        fetchUser.rejected(errorTest, '')
      );
      expect(stateTest.isLoading).toBe(false);
    });

    it('4/1/3. fulfilled', () => {
      const stateTest = user(initialStates[0], {
        type: fetchUser.fulfilled.type,
        payload: { user: userData }
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.userData).toEqual(userData);
    });
  });
  //
  describe('4/2. fetchUpdateUser', () => {
    it('4/2/1. pending', () => {
      const stateTest = user(initialStates[0], {
        type: fetchUpdateUser.pending.type
      });
      expect(stateTest.isLoading).toBe(true);
    });

    it('4/2/2. rejected', () => {
      const stateTest = user(initialStates[1], {
        type: fetchUpdateUser.rejected.type
      });
      expect(stateTest.isLoading).toBe(false);
    });

    it('4/2/3. fulfilled', () => {
      const stateTest = user(initialStates[2], {
        type: fetchUpdateUser.fulfilled.type,
        payload: { user: userData }
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.userData).toEqual(userData);
    });
  });
  //
  describe('4/3. fetchRegistration', () => {
    it('4/3/1. pending', () => {
      const stateTest = user(initialStates[0], {
        type: fetchRegistration.pending.type
      });
      expect(stateTest.isLoading).toBe(true);
      expect(stateTest.isAuth).toBe(false);
    });

    it('4/3/2. rejected', () => {
      const stateTest = user(initialStates[1], {
        type: fetchRegistration.rejected.type
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.isAuth).toBe(false);
    });

    it('4/3/3. fulfilled', () => {
      const stateTest = user(initialStates[0], {
        type: fetchRegistration.fulfilled.type,
        payload: { user: userData }
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.isAuth).toBe(true);
      expect(stateTest.userData).toEqual(userData);
    });
  });
  //
  describe('4/4. fetchLogin', () => {
    it('4/4/1. pending', () => {
      const stateTest = user(initialStates[0], {
        type: fetchLogin.pending.type
      });
      expect(stateTest.isLoading).toBe(true);
      expect(stateTest.isAuth).toBe(false);
    });

    it('4/4/2. rejected', () => {
      const stateTest = user(initialStates[1], {
        type: fetchLogin.rejected.type
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.isAuth).toBe(false);
    });

    it('4/4/3. fulfilled', () => {
      const stateTest = user(initialStates[0], {
        type: fetchLogin.fulfilled.type,
        payload: { user: userData }
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.isAuth).toBe(true);
      expect(stateTest.userData).toEqual(userData);
    });
  });
  //
  describe('4/5. fetchLogout', () => {
    it('4/5/1. pending', () => {
      const stateTest = user(initialStates[0], {
        type: fetchLogout.pending.type
      });
      expect(stateTest.isLoading).toBe(true);
      expect(stateTest.isAuth).toBe(false);
    });

    it('4/5/2. rejected', () => {
      const stateTest = user(initialStates[1], {
        type: fetchLogout.rejected.type
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.isAuth).toBe(false);
    });

    it('4/5/3. fulfilled', () => {
      const stateTest = user(initialStates[2], {
        type: fetchLogout.fulfilled.type
      });
      expect(stateTest.isLoading).toBe(false);
      expect(stateTest.isAuth).toBe(false);
      expect(stateTest.userData).toEqual(userDataNull);
    });
  });
});
