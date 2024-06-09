import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ItemModel } from "../models/ItemModel";

/* Slices */
// 장바구니 slice
const myCartSlice = createSlice({
  name: "myCart",
  // server 구축 후 구현 ...
  initialState: [],
  reducers: {
    // 장바구니 아이템 추가
    addItem: (state: any, action) => {
      state.value.push(action.payload.data);
    },
    // 장바구니 삭제
    removeItem: (state: any, action) => {
      state.value.filter((obj: any) => obj["id"] !== action.payload.data.id);
    },
  },
});

// 주문 목록 히스토리 슬라이스
const orderHistorySlice = createSlice({
  name: "orderHistory",
  // server 구축 후 구현 ...
  initialState: [],
  reducers: {
    // 주문 정보 추가
    recordOrder: (state: any, action) => {
      state.value.push(action.payload.data);
    },
  },
});

// Configure Store
const store = configureStore({
  reducer: {
    myCart: myCartSlice.reducer,
    orderHistory: orderHistorySlice.reducer,
  },
});

export default store;
