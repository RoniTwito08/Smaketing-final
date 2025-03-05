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

// modify the theme to support RTL DO NOT REMOVE
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const rtlTheme = createTheme({
  direction: "rtl",
});

const clientId =
  "950730786723-fieqdsnl9pdu59ulecvbve0anmeak3av.apps.googleusercontent.com";

const App: React.FC = () => {
  return (
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
  );
};

export default App;
