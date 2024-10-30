"use client";

import store from "@/store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div
            style={{
              width: "100%",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            Loading
          </div>
        }
        persistor={persistor}
      >
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {children}
          </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
      </PersistGate>
    </Provider>
  );
}
