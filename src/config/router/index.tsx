import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./routes";
import AuthLayout from "../../components/layouts/AuthLayout.tsx";
import InternalError from "../../components/internal-error";
import AppLayout from "../../components/layouts/AppLayout.tsx";
import NotFoundScreen from "../../screens/auth/not-found";
import ComponentsScreen from "../../screens/app/start";
import ForgotPasswordScreen from "../../screens/auth/forgot-password";
import HomeScreen from "../../screens/app/home";
import OrdersScreen from "../../screens/app/orders";
import Account from "../../screens/auth/account";
import { CreateOrderScreen } from "../../screens/app/create-order";
import ProfileScreen from "../../screens/app/profile";
import { OrderDetailsScreen } from "../../screens/app/order-details";
import PoolListScreen from "../../screens/app/pool-list";
import { EditOrderScreen } from "../../screens/app/edit-order";
import { CreateServiceScreen } from "../../screens/app/create-service";
import { ServiceDetailsScreen } from "../../screens/app/service-details";

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
        </Route>

        <Route
          path="/"
          element={<AppLayout />}
          errorElement={<InternalError />}
        >
          <Route index element={<HomeScreen />} />
          {/* Orders */}
          <Route path="orders" element={<OrdersScreen />} />
          <Route path="create-order" element={<CreateOrderScreen />} />
          <Route path="edit-order/:orderId" element={<EditOrderScreen />} />
          <Route path="orders/:orderId" element={<OrderDetailsScreen />} />

          {/* Services */}
          <Route path="create-service" element={<CreateServiceScreen />} />
          <Route
            path="requests/:serviceId"
            element={<ServiceDetailsScreen />}
          />

          <Route path="pool-list" element={<PoolListScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
        </Route>

        <Route path={ROUTES.COMPONENTS_ROUTE} element={<ComponentsScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
