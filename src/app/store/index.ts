import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import { persistedCartReducer, persistedSessionReducer } from "./persist";
import { orderHistorySlice } from "../../entities/order";
import { itemsSlice } from "../../entities/items";

// Configure Store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    orderHistory: orderHistorySlice.reducer,
    loginSession: persistedSessionReducer,
    items: itemsSlice.reducer,
  },
});

// Export Persistor
export const persistor = persistStore(store);
export default store;
