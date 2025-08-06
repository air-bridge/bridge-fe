import { Grid2 } from "@mui/material";
import { mockServices } from "../../mocks/service.ts";
import ServiceCard from "../service-card";

export const PoolList = () => {
  return (
    <Grid2 container spacing={2}>
      {mockServices.map((service) => (
        <Grid2 key={service.id} size={{ xs: 12, lg: 4 }}>
          <ServiceCard data={service} />
        </Grid2>
      ))}
    </Grid2>
  );
};
