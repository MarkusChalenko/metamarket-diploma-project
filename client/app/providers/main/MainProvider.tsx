import dynamic from "next/dynamic";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Layout } from "@/components/layout/Layout";

import { ReduxToastr } from "@/ui/toastr/ReduxToastr";

import { persister, store } from "@/store/store";

import { AuthProvider } from "../auth/AuthProvider";
import { HeadProvider } from "../head/HeadProvider";

import { IMainProvider } from "./mainProvider.interface";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const MainProvider: FC<IMainProvider> = ({
  children,
  Component,
}): JSX.Element => {
  return (
    <HeadProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <QueryClientProvider client={queryClient}>
            <ReduxToastr />
            <AuthProvider Component={Component}>
              <Layout>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </Layout>
            </AuthProvider>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </HeadProvider>
  );
};
