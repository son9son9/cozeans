import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppRouter } from "../routers";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};
