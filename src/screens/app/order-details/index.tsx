import { Container, Stack } from "@mui/material";
import { OrderDetailsHeading } from "../../../components/order-heading/OrderDetailsHeading.tsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder } from "../../../api/order.ts";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";
import { OrderDetails } from "../../../components/order-details";

export const OrderDetailsScreen = () => {
  const { orderId = "" } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <OrderDetailsHeading showAction={!isError && !isLoading} />

      <Container
        sx={{
          maxWidth: { xs: "100%", lg: "620px" },
          px: { xs: 2, lg: 0 },
          py: 3,
          pt: { xs: 0, lg: "100px" },
        }}
      >
        {isError && <ErrorInfo message={error?.message} />}
        {isLoading && <Loading />}
        {data && <OrderDetails data={data} />}
      </Container>
    </Stack>
  );
};
