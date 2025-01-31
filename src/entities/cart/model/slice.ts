import { createSlice } from "@reduxjs/toolkit";

// 장바구니 slice
export const cartSlice = createSlice({
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

export const cartActions = cartSlice.actions;
