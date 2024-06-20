import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AccountModel } from "../models/AccountModel";
import { dataSample } from "../dataSample";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

/* Slices */
// 장바구니 slice
const cartSlice = createSlice({
  name: "cart",
  // server 구축 후 구현 ...
  initialState: { value: [] },
  reducers: {
    // 장바구니 아이템 추가, Item 객체를 받아서 push로 추가
    addItem: (state: any, action) => {
      state.value.push(action.payload);
    },
    // 장바구니 삭제, index를 action으로 받아와서 index에 해당하는 배열 요소 삭제
    removeItem: (state: any, action) => {
      state.value.splice(action.payload, 1);
    },
    // 개수 증가, index를 action으로 받아와서 index에 해당하는 요소의 개수 증가
    increaseQuantity: (state: any, action) => {
      if (state.value[action.payload].quantity < 100) {
        state.value[action.payload].quantity++;
      }
    },
    // 개수 감소, index를 action으로 받아와서 index에 해당하는 요소의 개수 감소
    decreaseQuantity: (state: any, action) => {
      if (state.value[action.payload].quantity > 1) {
        state.value[action.payload].quantity--;
      }
    },
  },
});

// Persisted cart reducer
const persistedCartReducer = persistReducer(
  {
    key: "cart",
    storage,
  },
  cartSlice.reducer
);

// 주문 목록 히스토리 슬라이스
const orderHistorySlice = createSlice({
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

// Account Info
const accountInfoSlice = createSlice({
  name: "accountInfo",
  initialState: { value: [{ id: "admin", password: "1234", name: "관리자" }] },
  reducers: {
    // 회원가입 시 계정 추가
    addAccount: (state: any, action) => {
      state.value = action.payload;
    },
    // 계정 삭제
    removeAccount: (state: any, action) => {
      state.value.filter((obj: AccountModel) => obj["id"] !== action.payload.id);
    },
  },
});

// Login Session
const loginSessionSlice = createSlice({
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

// 상품 목록
const itemsSlice = createSlice({
  name: "items",
  initialState: { value: dataSample },
  reducers: {},
});

// Configure Store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    orderHistory: orderHistorySlice.reducer,
    accountInfo: accountInfoSlice.reducer,
    loginSession: loginSessionSlice.reducer,
    items: itemsSlice.reducer,
  },
});

// Export Persistor
export const persistor = persistStore(store);

export const cartActions = cartSlice.actions;
export const orderHistoryActions = orderHistorySlice.actions;
export const accountInfoActions = accountInfoSlice.actions;
export const loginSessionActions = loginSessionSlice.actions;
export const itemsActions = itemsSlice.actions;

export default store;
