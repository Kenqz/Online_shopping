import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: null, userInfo: {} },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.userInfo = user;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.userInfo = {};
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
