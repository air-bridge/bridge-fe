import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { orders } from "../../../mocks/order.ts";
import { EmptyService } from "../../../components/service-list/EmptyService.tsx";
import { ServiceList } from "../../../components/service-list";
type Props = {
  count?: number;
};

export const PassengerDashboard = ({ count = 0 }: Props) => {
  // TODO: switch to api count
  const homeOrders = orders.slice(0, 2);

  return (
    <Stack gap={4}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 0.5,
          borderBottom: "solid 1px",
          borderBottomColor: "grey.300",
        }}
      >
        <Typography variant="body1">My Services</Typography>

        {count > 0 && (
          <Typography
            variant="body2"
            component={Link}
            to="/services"
            color="primary.main"
          >
            See All
          </Typography>
        )}
      </Stack>

      {count === 0 ? <EmptyService /> : <ServiceList orders={homeOrders} />}
    </Stack>
  );
};
