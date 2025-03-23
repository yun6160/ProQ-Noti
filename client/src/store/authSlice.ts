import { RootState } from './store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeLogin: (state) => {
      state.isLoggedIn = true;
    },
    storeLogout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { storeLogin, storeLogout } = authSlice.actions;

export default authSlice.reducer;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
