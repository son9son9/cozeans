import { createSlice } from "@reduxjs/toolkit";

// 상품 목록
export const itemsSlice = createSlice({
  name: "items",
  initialState: { value: [] },
  reducers: {
    getItems: (state: any, action) => {
      state.value = action.payload;
    },
  },
});

export const itemsActions = itemsSlice.actions;
