import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Theme,
} from "@mui/material";
import { OrderDetailsHeading } from "../../../components/order-heading/OrderDetailsHeading.tsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder } from "../../../api/order.ts";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";
import { OrderDetails } from "../../../components/order-details";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MatchTrigger } from "../../../components/match-trigger";

export const OrderDetailsScreen = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { orderId = "" } = useParams();

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleCloseDrawer = (_: unknown, reason: string) => {
    if (reason === "backdropClick") return;

    closeDrawer();
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  const showAction = !isError && !isLoading;

  return (
    <>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <OrderDetailsHeading showAction={showAction} onOpen={openDrawer} />

        <Container
          sx={{
            maxWidth: { xs: "100%", lg: "620px" },
            px: { xs: 2, lg: 0 },
            py: 3,
            pt: { xs: 0, lg: "100px" },
          }}
        >
          <Stack gap={2}>
            {isError && <ErrorInfo message={error?.message} />}
            {isLoading && <Loading />}
            {data && <OrderDetails data={data} />}

            {isMobile && showAction && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={openDrawer}
              >
                Check Availability
              </Button>
            )}
          </Stack>
        </Container>
      </Stack>

      <Dialog open={open} onClose={handleCloseDrawer} disableEscapeKeyDown>
        <DialogContent
          sx={{
            bgcolor: "black",
            px: { xs: 3, lg: 10 },
            pt: { xs: 2, lg: 6 },
            pb: { xs: 5, lg: 6 },
          }}
        >
          {isMobile && (
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={closeDrawer}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          )}
          <MatchTrigger onClose={closeDrawer} />
        </DialogContent>
      </Dialog>
    </>
  );
};
