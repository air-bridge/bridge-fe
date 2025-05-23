import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as ROUTES from "./routes";
import AuthLayout from "../../components/layouts/AuthLayout.tsx";
import InternalError from "../../components/internal-error";
import Login from "../../screens/auth/login";
import AppLayout from "../../components/layouts/AppLayout.tsx";
import { PublicHomepage } from "../../screens/app/home";
import NotFoundScreen from "../../screens/auth/not-found";
import Register from "../../screens/auth/register";
import ComponentsScreen from "../../screens/app/start";
import ForgotPasswordScreen from "../../screens/auth/forgot-password";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={<AuthLayout />}
          errorElement={<InternalError />}
        >
          <Route index element={<Navigate to={ROUTES.LOGIN_ROUTE} />} />
          <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
          <Route path={ROUTES.SIGNUP_ROUTE} element={<Register />} />
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
          <Route index element={<PublicHomepage />} />
        </Route>

        <Route path={ROUTES.COMPONENTS_ROUTE} element={<ComponentsScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
