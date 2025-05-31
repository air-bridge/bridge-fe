import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./routes";
import AuthLayout from "../../components/layouts/AuthLayout.tsx";
import InternalError from "../../components/internal-error";
import AppLayout from "../../components/layouts/AppLayout.tsx";
import NotFoundScreen from "../../screens/auth/not-found";
import ComponentsScreen from "../../screens/app/start";
import ForgotPasswordScreen from "../../screens/auth/forgot-password";
import HomeScreen from "../../screens/app/home";
import Account from "../../screens/auth/account";
import OTPVerificationScreen from "../../screens/auth/otp-verification";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Registration & Login */}
        <Route path="/account" element={<Account />} />

        <Route
          path="/auth"
          element={<AuthLayout />}
          errorElement={<InternalError />}
        >
          <Route
            path={ROUTES.FORGOT_PASSWORD_ROUTE}
            element={<ForgotPasswordScreen />}
          />
          <Route
            path={ROUTES.OTP_VERIFICATION_ROUTE}
            element={<OTPVerificationScreen />}
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
