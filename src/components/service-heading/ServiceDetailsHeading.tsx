import { Button, IconButton, Stack, Theme, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ServiceStatus } from "../../types/service.ts";

type Props = {
  showAction: boolean;
  status?: ServiceStatus;
  serviceId?: number;
  onOpen: () => void;
};
export const ServiceDetailsHeading = ({
  showAction,
  status,
  serviceId,
  onOpen,
}: Props) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  const isActive = status === ServiceStatus.Active;

  return (
    <>
      <Stack
        px={{ xs: 2, lg: 5 }}
        py={{ xs: 1.5, lg: 2 }}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{
          bgcolor: "white",
          borderBottom: "solid 1px",
          zIndex: 2,
          borderBottomColor: "grey.200",
          position: { xs: "unset", lg: "fixed" },
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <Stack gap={1} alignItems="center" direction="row">
          <IconButton onClick={() => navigate("/")} data-testid="close-button">
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ pl: 1, borderLeft: "solid 1px", borderLeftColor: "grey.300" }}
          >
            Service Details
          </Typography>
        </Stack>

        {!isMobile && showAction && (
          <Stack gap={2} alignItems="center" direction="row">
            {serviceId && (
              <Button
                variant={isActive ? "outlined" : "contained"}
                color="primary"
                type="submit"
                sx={{ px: 5 }}
                component={Link}
                to={`/edit-order/${serviceId}`}
              >
                Edit
              </Button>
            )}

            {/*  TODO: confirm status for order ready for matching */}
            {isActive && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ px: 3 }}
                onClick={onOpen}
              >
                Check Availability
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
};
