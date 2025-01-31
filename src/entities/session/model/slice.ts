import { createSlice } from "@reduxjs/toolkit";

// Login Session
export const loginSessionSlice = createSlice({
  name: "loginSession",
  initialState: { value: {} },
  reducers: {
    // 로그인 상태
    login: (state: any, action) => {
      state.value = action.payload;
    },
    // 로그아웃 상태
    logout: (state: any) => {
      state.value = {};
    },
  },
});

export const loginSessionActions = loginSessionSlice.actions;
