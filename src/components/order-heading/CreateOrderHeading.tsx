import { Button, IconButton, Stack, Theme, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

type Props = {
  showReview: boolean;
  onSetShowReview: () => void;
  onBack: () => void;
};
export const CreateOrderHeading = ({
  onBack,
  showReview,
  onSetShowReview,
}: Props) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const navigate = useNavigate();

  return (
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
          Create Order
        </Typography>
      </Stack>

      {!isMobile && (
        <Stack gap={2} alignItems="center" direction="row">
          {showReview ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
                sx={{ px: 5 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ px: 5 }}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                sx={{ px: 5 }}
              >
                Save for later
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onSetShowReview();
                }}
                sx={{ px: 5 }}
              >
                Review
              </Button>
            </>
          )}
        </Stack>
      )}
    </Stack>
  );
};
