import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import AppRoutes from "./navigation/Routes";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// modify the theme to support RTL DO NOT REMOVE
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const rtlTheme = createTheme({
  direction: "rtl",
});

const queryClient = new QueryClient();


const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <CacheProvider value={rtlCache}>
            <ThemeProvider theme={rtlTheme}>
              <div dir="rtl">
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </div>
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
