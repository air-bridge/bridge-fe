import { Button, IconButton, Stack, Theme, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

type Props = {
  mobile?: boolean;
};

export const CreateOrderHeading = ({ mobile }: Props) => {
  const isMobile =
    mobile || useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  return (
    <Stack
      px={{ xs: 2, lg: 5 }}
      py={{ xs: 1.5, lg: 3 }}
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      sx={{ borderBottom: "solid 1px", borderBottomColor: "grey.200" }}
    >
      <Stack gap={1} alignItems="center" direction="row">
        <IconButton onClick={() => navigate(-1)}>
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
          <Button variant="outlined" color="primary">
            Save for later
          </Button>
          <Button variant="contained" color="primary">
            Review
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
