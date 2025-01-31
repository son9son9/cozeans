import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { cartSlice } from "../../entities/cart";
import { loginSessionSlice } from "../../entities/session";

export const persistedCartReducer = persistReducer(
  {
    key: "cart",
    storage,
  },
  cartSlice.reducer
);

export const persistedSessionReducer = persistReducer(
  {
    key: "loginSession",
    storage,
  },
  loginSessionSlice.reducer
);
