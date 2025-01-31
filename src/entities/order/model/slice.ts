import { createSlice } from "@reduxjs/toolkit";

// 주문 목록 히스토리 슬라이스
export const orderHistorySlice = createSlice({
  name: "orderHistory",
  // server 구축 후 구현 ...
  initialState: { value: [] },
  reducers: {
    // 주문 정보 추가
    recordOrder: (state: any, action) => {
      state.value.push(action.payload.data);
    },
  },
});

export const orderHistoryActions = orderHistorySlice.actions;
