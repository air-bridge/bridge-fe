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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MatchTrigger } from "../../../components/match-trigger";
import { getService } from "../../../api/service.ts";
import { ServiceDetailsHeading } from "../../../components/service-heading/ServiceDetailsHeading.tsx";
import { ServiceRequestDetails } from "../../../components/service-request-details";

export const ServiceRequestDetailsScreen = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { serviceId = "" } = useParams();

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
    queryKey: ["service-details", serviceId],
    queryFn: () => getService(serviceId),
    enabled: !!serviceId,
  });

  const showAction = !isError && !isLoading;

  return (
    <>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <ServiceDetailsHeading
          showAction={showAction}
          onOpen={openDrawer}
          status={data?.status}
          serviceId={data?.id}
        />

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
            {data && <ServiceRequestDetails data={data} />}

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
