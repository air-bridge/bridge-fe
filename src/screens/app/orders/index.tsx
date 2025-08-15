import { Stack } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { orders } from "../../../mocks/order.ts";
import { EmptyService } from "../../../components/service-list/EmptyService.tsx";
import { OrderSearchContextProvider } from "../../../context/orders-search";
import { OrderFilters } from "../../../components/order-filters";
import { OrderList } from "../../../components/order-list";

const OrdersScreen = () => {
  const ordersCount = orders.length || 0;
  const isEmpty = ordersCount === 0;

  return (
    <OrderSearchContextProvider>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <HomepageTabs showAction={true} />
        <OrderFilters />
        <Stack gap={4}>
          {isEmpty ? <EmptyService /> : <OrderList orders={orders} />}
        </Stack>
      </Stack>
    </OrderSearchContextProvider>
  );
};

export default OrdersScreen;
