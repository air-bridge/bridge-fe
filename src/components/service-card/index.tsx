import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ServiceStatusLabel } from "./ServiceStatusLabel.tsx";
import { ServiceTimeline } from "./ServiceTimeline.tsx";
import dayjs from "dayjs";
import { Service } from "../../types/service.ts";

type Props = {
  data: Service;
};

const ServiceCard = ({ data }: Props) => {
  return (
    <Card>
      <CardContent>
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
              Created on {dayjs(data.created_at).format("MMMM D, YYYY h:mm A")}
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

        <Box
          sx={{ borderTop: "solid 1px", borderTopColor: "grey.300" }}
          py={2}
          mt={2}
        >
          <ServiceTimeline data={data} />
        </Box>

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
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
