import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as ROUTES from "./routes";
import AuthLayout from "../../components/layouts/AuthLayout.tsx";
import InternalError from "../../components/internal-error";
import AppLayout from "../../components/layouts/AppLayout.tsx";
import NotFoundScreen from "../../screens/auth/not-found";
import ComponentsScreen from "../../screens/app/start";
import ForgotPasswordScreen from "../../screens/auth/forgot-password";
import HomeScreen from "../../screens/app/home";
import Account from "../../screens/auth/account";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={<AuthLayout />}
          errorElement={<InternalError />}
        >
          <Route
            index
            element={<Navigate to={ROUTES.LOGIN_REGISTER_ROUTE} />}
          />
          <Route path={ROUTES.LOGIN_REGISTER_ROUTE} element={<Account />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD_ROUTE}
            element={<ForgotPasswordScreen />}
          />
        </Route>

        <Route
          path="/"
          element={<AppLayout />}
          errorElement={<InternalError />}
        >
          <Route index element={<HomeScreen />} />
        </Route>

        <Route path={ROUTES.COMPONENTS_ROUTE} element={<ComponentsScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
