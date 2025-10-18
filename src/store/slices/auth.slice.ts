import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/store';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    _id: string;
    name: string;
    phoneNumber: string;
    type: string;
    email: string;
    image: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, { payload }: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.user = payload;
      return state;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = null;
      return state;
    },
    updateUser(
      state,
      {
        payload,
      }: PayloadAction<{ name?: string; image?: string; email?: string }>,
    ) {
      state.user = { ...state.user!!, ...payload };
      return state;
    },
    hydrateAuth(state) {
      // Used on app initialization when token exists in Keychain
      // Sets isAuthenticated to true without user data
      state.isAuthenticated = true;
      return state;
    },
  },
});

export const getAuth = (state: RootState) => state.auth.user;
export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;

export const { loginSuccess, logOut, updateUser, hydrateAuth } =
  authSlice.actions;
