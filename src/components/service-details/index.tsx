import {
  Divider,
  Stack,
  Typography,
  Collapse,
  Box,
  Theme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Service } from "../../types/service.ts";
import dayjs from "dayjs";
import { serviceStatusColor, transportTypes } from "../service-form/util.ts";
import { ButtonChip } from "../button-chip";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { mockOpenOrder, mockOpenOrder2 } from "../../mocks/order.ts";
import { PreviewOrderCard } from "../order-card/PreviewOrderCard.tsx";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  data: Service;
};

const mockRequests = [
  mockOpenOrder,
  mockOpenOrder2,
  mockOpenOrder2,
  mockOpenOrder,
];
export const ServiceDetails = ({ data }: Props) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  const [open, setOpen] = useState(true);
  const transportType = transportTypes.find(
    (transport) => transport.value === data.transport_type,
  );
  return (
    <Stack gap={{ xs: 2, lg: 2 }}>
      <Typography variant="h5">Request (2)</Typography>
      {isMobile ? (
        <MobileRequestsWrapper>
          {mockRequests.map((request) => (
            <Stack
              key={request.id}
              gap={3}
              sx={{
                width: 270,
                flex: "0 0 auto",
              }}
            >
              <PreviewOrderCard order={request} />
            </Stack>
          ))}
        </MobileRequestsWrapper>
      ) : (
        <Grid container spacing={1}>
          {mockRequests.map((request) => (
            <Grid size={{ lg: 6 }} key={request.id}>
              <PreviewOrderCard order={request} />
            </Grid>
          ))}
        </Grid>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setOpen(!open)}
        px={2}
        py={2}
        sx={{
          borderRadius: 3,
          bgcolor: "grey.200",
          cursor: "pointer",
        }}
      >
        <Typography variant="subtitle2">Service Details</Typography>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Stack>
      <Collapse in={open}>
        <Stack gap={{ xs: 2, lg: 3 }}>
          <Grid container spacing={{ xs: 1, lg: 2 }}>
            <Grid size={{ xs: 12 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Service Title
                </Typography>
                <Typography color="text.primary">{data.title}</Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Available weight
                </Typography>
                <Typography>{`${data.weight}KG`}</Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Price Per KG
                </Typography>
                <Typography
                  textTransform="uppercase"
                  sx={{ fontWeight: 600 }}
                >{`${data.price_per_kg} ${data.currency}`}</Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Departure Date
                </Typography>
                <Typography>
                  {dayjs(data.departure_date).format("lll")}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Arrival Date
                </Typography>
                <Typography>
                  {dayjs(data.arrival_date).format("lll")}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Created Date
                </Typography>
                <Typography>{dayjs(data.created_at).format("lll")}</Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Status
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    color: serviceStatusColor[data.status],
                  }}
                >
                  {data.status}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h4">Destination</Typography>

          <Grid container spacing={{ xs: 1, lg: 2 }}>
            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  From
                </Typography>
                <Typography>
                  {`${data.departure_city}, ${data.departure_country}`}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  To
                </Typography>
                <Typography>
                  {`${data.arrival_city}, ${data.arrival_country}`}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack>
                <Typography color="text.secondary" variant="body2">
                  Phone
                </Typography>
                <Typography>{data.phone}</Typography>
              </Stack>
            </Grid>

            {transportType && (
              <Grid size={{ xs: 6 }}>
                <Stack gap={0.5}>
                  <Typography color="text.secondary" variant="body2">
                    Trip Type
                  </Typography>

                  <ButtonChip
                    label={transportType.name}
                    Icon={transportType.icon}
                  />
                </Stack>
              </Grid>
            )}

            {data.delivery_note && (
              <Grid size={{ xs: 12 }}>
                <Stack
                  gap={0.5}
                  py={2}
                  mt={2}
                  sx={{
                    borderTop: "solid 1px",
                    borderBottom: "solid 1px",
                    borderTopColor: "divider",
                    borderBottomColor: "divider",
                  }}
                >
                  <Typography color="text.secondary" variant="body2">
                    Additional Note
                  </Typography>

                  <Typography variant="body2">{data.delivery_note}</Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileRequestsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${({ theme }) => theme.spacing(1)};
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
