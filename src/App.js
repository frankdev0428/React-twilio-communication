import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "components/Layout/Layout";
import AuthorizedRoute from "router/AuthorizedRoute";
import LoginRegisterRoute from "router/LoginRegisterRoute";
import { theme } from "./theme/theme";
import { store } from "redux/store";
import { routes, authorizedRoutes } from "router/routes";
import { MaterialUIControllerProvider } from "./context"

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MaterialUIControllerProvider>
            <Routes>
              <Route element={<Layout hideHeaderPaths={["/login", "/signup"]} />}>
                <Route element={<AuthorizedRoute />}>
                  {authorizedRoutes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
                <Route element={<LoginRegisterRoute />}>
                  {routes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
              </Route>
            </Routes>
            </MaterialUIControllerProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
