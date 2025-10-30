import { Stack, Pagination } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { OrderFilters } from "../../../components/order-filters";
import { OrderList } from "../../../components/order-list";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../../api/order.ts";
import { useOrderSearchContext } from "../../../context/orders-search/util.ts";
import { OrderSearchResponse } from "../../../types/order.ts";
import { EmptyOrder } from "../../../components/order-list/EmptyOrder.tsx";

const OrdersScreen = () => {
  const { payload, setPayload } = useOrderSearchContext();
  const { limit, offset, status, page } = payload;

  const { data } = useQuery<OrderSearchResponse>({
    queryKey: ["orders", limit, offset, page, status],
    queryFn: () => getOrders(payload),
  });

  const orders = data?.data || [];
  const ordersCount = data?.pagination?.total_items || 0;
  const isEmpty = ordersCount === 0;
  const paginationCount =
    ordersCount === 0 ? 0 : Math.ceil(ordersCount / Number(limit));

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <HomepageTabs showAction={true} />
      <OrderFilters />
      <Stack gap={3}>
        {isEmpty ? <EmptyOrder /> : <OrderList orders={orders} />}

        <Stack sx={{ direction: "row", alignItems: "flex-end" }}>
          <Pagination
            count={paginationCount}
            variant="outlined"
            color="primary"
            page={Number(page)}
            onChange={(_, p) => {
              const newOffset = (p - 1) * Number(limit);
              setPayload({ page: p.toString(), offset: newOffset.toString() });
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrdersScreen;
