import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as ROUTES from "./routes";
import AuthLayout from "../../components/layouts/AuthLayout.tsx";
import InternalError from "../../components/internal-error";
import Login from "../../screens/auth/login";
import PublicLayout from "../../components/layouts/PublicLayout.tsx";
import { PublicHomepage } from "../../screens/public/home";
import NotFoundScreen from "../../screens/auth/not-found";
import Register from "../../screens/auth/register";

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
        </Route>

        <Route
          path="/"
          element={<PublicLayout />}
          errorElement={<InternalError />}
        >
          <Route index element={<PublicHomepage />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
