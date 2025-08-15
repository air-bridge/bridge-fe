import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { mockServices } from "../../mocks/service.ts";
import ServiceCard from "../service-card";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Service, ServiceStatus } from "../../types/service.ts";
import { ServiceInfo } from "../service-card/ServiceInfo.tsx";
import Lottie from "lottie-react";
import animationJson from "../../assets/animation/plane.json";

export const PoolList = () => {
  const [activeService, setActiveService] = useState<null | Service>(null);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const closeDrawer = () => {
    setOpen(false);
    setActiveService(null);
  };

  const openDrawer = (data: Service) => {
    setOpen(true);
    setActiveService(data);
  };

  const mutateRequest = () => {
    setOpen(false);
    setOpenConfirmation(true);
  };

  return (
    <>
      <Grid2 container spacing={2}>
        {mockServices.map((service) => (
          <Grid2 key={service.id} size={{ xs: 12, lg: 4 }}>
            <Box
              onClick={() => {
                openDrawer(service);
              }}
            >
              <ServiceCard data={service} />
            </Box>
          </Grid2>
        ))}
      </Grid2>

      <Dialog
        open={open}
        onClose={closeDrawer}
        disableEscapeKeyDown
        fullScreen={isMobile}
      >
        <DialogContent sx={{ minWidth: { xs: "100%", lg: 450 } }}>
          {activeService && (
            <>
              <Stack gap={3}>
                <ServiceInfo data={activeService} />
                <TextField
                  fullWidth
                  name="comment"
                  placeholder="Type your comment here"
                  multiline
                  rows={3}
                />
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={1.5}
          >
            <Button variant="outlined" color="secondary" onClick={closeDrawer}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={mutateRequest}
              disabled={activeService?.status === ServiceStatus.Matched}
            >
              Request for service
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Request confirmation */}
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        disableEscapeKeyDown
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ textAlign: "right" }}>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <InfoIcon fontSize="large" sx={{ color: "warning.main" }} />

            <CloseIcon
              onClick={() => setOpenConfirmation(false)}
              sx={{ color: "text.secondary" }}
            />
          </Stack>
        </DialogTitle>

        <DialogContent
          sx={{
            borderBottom: "solid 1px",
            borderBottomColor: "divider",
            maxWidth: { xs: "100%", lg: 400 },
            mt: 1,
          }}
        >
          <Stack gap={1}>
            <Typography variant="h4">Make Request?</Typography>
            <Typography color="text.secondary">
              You are about to make a request from this passenger, are you sure
              you want to take this action?
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={1.5}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenConfirmation(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenConfirmation(false);
                setOpenSuccess(true);
              }}
            >
              Yes, Request
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Success info Dialog */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        disableEscapeKeyDown
        fullScreen={isMobile}
      >
        <DialogContent
          sx={{
            borderBottom: "solid 1px",
            borderBottomColor: "divider",
            maxWidth: { xs: "100%", lg: 400 },
          }}
        >
          <Stack alignItems="center" justifyContent="center" gap={2}>
            <Lottie
              loop
              animationData={animationJson}
              style={{ width: 100, height: 100 }}
            />

            <Typography variant="h4" textAlign="center">
              Request Sent Successfully
            </Typography>
            <Typography textAlign="center" color="text.secondary">
              You have successfully made a request to the passenger. You will be
              notified when they accept your request also.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setOpenConfirmation(false);
              setOpenSuccess(false);
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
