import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { ServiceStatusLabel } from "./ServiceStatusLabel.tsx";
import { ServiceTimeline } from "./ServiceTimeline.tsx";
import dayjs from "dayjs";
import { Service } from "../../types/service.ts";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

type Props = {
  data: Service;
  onOpen: (arg: Service) => void;
};

const ServiceCard = ({ data, onOpen }: Props) => {
  return (
    <Card onClick={() => onOpen(data)} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant="subtitle1" noWrap>
              {data.title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography variant="caption">
                Created on{" "}
                {dayjs(data.created_at).format("MMMM D, YYYY h:mm A")}
              </Typography>
              <ServiceStatusLabel status={data.status} />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Transport Type:&nbsp;
              <strong style={{ color: "black" }}>{data.transport_type}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Available Weight:&nbsp;
              <strong style={{ color: "black" }}>{data.weight}KG</strong>
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 5,
              bgcolor: "info.light",
              width: "fit-content",
            }}
          >
            <Typography variant="subtitle2">
              {`${data.price_per_kg} ${data.currency} per KG`}
            </Typography>
            <LocalAtmIcon />
          </Stack>

          <ServiceTimeline data={data} />

          <Stack alignItems="center" gap={1} direction="row" minHeight={20}>
            {data.package_type.length > 0 && (
              <>
                <Typography color="text.secondary" variant="body2">
                  Package type:
                </Typography>

                <Stack direction="row" alignItems="center" gap={0.5}>
                  {data.package_type.map((c, index) => (
                    <Typography
                      variant="caption"
                      key={index}
                      sx={{
                        borderRadius: 1.5,
                        px: 0.5,
                        py: 0.25,
                        bgcolor: "success.light",
                        textTransform: "capitalize",
                      }}
                    >
                      {c}
                    </Typography>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
