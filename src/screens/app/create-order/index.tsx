import { CreateOrderHeading } from "../../../components/order-heading/CreateOrderHeading.tsx";
import { OrderForm } from "../../../components/order-form";
import { Container, Stack } from "@mui/material";

export const CreateOrderScreen = () => {
  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <CreateOrderHeading />

      <Container
        sx={{
          maxWidth: { xs: "100%", lg: "600px" },
          px: { xs: 2, lg: 0 },
          py: 3,
        }}
      >
        <OrderForm />
      </Container>
    </Stack>
  );
};
