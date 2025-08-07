import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid2,
  Theme,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { mockServices } from "../../mocks/service.ts";
import ServiceCard from "../service-card";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Service } from "../../types/service.ts";
import { ServiceInfo } from "../service-card/ServiceInfo.tsx";

export const PoolList = () => {
  const [activeService, setActiveService] = useState<null | Service>(null);
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <Grid2 container spacing={2}>
        {mockServices.map((service) => (
          <Grid2 key={service.id} size={{ xs: 12, lg: 4 }}>
            <ServiceCard data={service} onOpen={openDrawer} />
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
            <Button variant="contained" color="primary" onClick={closeDrawer}>
              Request for service
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
