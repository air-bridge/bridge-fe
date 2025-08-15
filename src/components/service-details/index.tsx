import { Stack } from "@mui/material";
import { Service } from "../../types/service.ts";
import { ServiceData } from "./ServiceData.tsx";

type Props = {
  data: Service;
};

export const ServiceDetails = ({ data }: Props) => {
  return (
    <Stack gap={{ xs: 2, lg: 2 }}>
      <ServiceData data={data} />
    </Stack>
  );
};
