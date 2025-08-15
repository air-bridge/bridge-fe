import { Stack, Typography, Collapse, Box, Theme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Service } from "../../types/service.ts";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { mockOpenOrder, mockOpenOrder2 } from "../../mocks/order.ts";
import { PreviewOrderCard } from "../order-card/PreviewOrderCard.tsx";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ServiceData } from "../service-details/ServiceData.tsx";

type Props = {
  data: Service;
};

const mockRequests = [
  mockOpenOrder,
  mockOpenOrder2,
  mockOpenOrder2,
  mockOpenOrder,
];
export const ServiceRequestDetails = ({ data }: Props) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const [open, setOpen] = useState(true);

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
        <ServiceData data={data} />
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
