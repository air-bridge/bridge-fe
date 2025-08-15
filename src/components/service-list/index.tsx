import { Grid2 } from "@mui/material";
import { Service } from "../../types/service.ts";
import ServiceCard from "../service-card";
import { Link } from "react-router-dom";

type Props = {
  data: Service[];
};
export const ServiceList = ({ data }: Props) => {
  return (
    <Grid2 container spacing={2}>
      {data.map((service) => (
        <Grid2 key={service.id} size={{ xs: 12, lg: 4 }}>
          <Link to={`/services/${service.id}`}>
            <ServiceCard data={service} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
};
