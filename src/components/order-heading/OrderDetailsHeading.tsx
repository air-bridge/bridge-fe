import { Button, IconButton, Stack, Typography, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  showAction: boolean;
  onOpen: () => void;
};
export const OrderDetailsHeading = ({ showAction, onOpen }: Props) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

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
          <IconButton onClick={() => navigate(-1)} data-testid="close-button">
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ pl: 1, borderLeft: "solid 1px", borderLeftColor: "grey.300" }}
          >
            Order Details
          </Typography>
        </Stack>

        {!isMobile && showAction && (
          <Stack gap={2} alignItems="center" direction="row">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ px: 3 }}
              onClick={onOpen}
            >
              Check Availability
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  );
};
