import {
  TLoginData,
  getUserApi,
  updateUserApi,
  registerUserApi,
  loginUserApi,
  logoutApi
} from '../../utils/burger-api';

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';

import { setCookie, deleteCookie } from '../../utils/cookie';

import { TUser } from '@utils-types';

export interface IUser {
  isAuth: boolean;
  userData: TUser;
}

export const initialState: IUser = {
  isAuth: false,
  userData: { name: '', email: '' }
};

export const fetchUser = createAsyncThunk('user/getUser', getUserApi);

export const fetchUpdateUser = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const fetchRegistration = createAsyncThunk(
  'user/registration',
  registerUserApi
);

export const fetchLogin = createAsyncThunk(
  'user/logIn',
  async (loginData: TLoginData) => {
    const res = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const fetchLogout = createAsyncThunk('user/logout', async function () {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

const UserSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {},

  selectors: {
    getUserData: (state) => state.userData,
    getIsAuth: (state) => state.isAuth
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isAuth = false;
    }),
      builder.addCase(fetchUser.rejected, (state) => {
        state.isAuth = false;
      }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userData = action.payload.user;
      });

    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userData = action.payload.user;
    });

    builder.addCase(fetchRegistration.pending, (state) => {
      state.isAuth = false;
    }),
      builder.addCase(fetchRegistration.rejected, (state) => {
        state.isAuth = false;
      }),
      builder.addCase(fetchRegistration.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userData = action.payload.user;
      });

    builder.addCase(fetchLogin.pending, (state) => {
      state.isAuth = false;
    }),
      builder.addCase(fetchLogin.rejected, (state) => {
        state.isAuth = false;
      }),
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userData = action.payload.user;
      });

    builder.addCase(fetchLogout.pending, (state) => {
      state.isAuth = false;
      state.userData = { name: '', email: '' };
    }),
      builder.addCase(fetchLogout.rejected, (state) => {
        state.isAuth = false;
        state.userData = { name: '', email: '' };
      }),
      builder.addCase(fetchLogout.fulfilled, (state) => {
        state.isAuth = false;
        state.userData = { name: '', email: '' };
      });
  }
});

export const { getUserData, getIsAuth } = UserSlice.selectors;

export const user = UserSlice.reducer;
