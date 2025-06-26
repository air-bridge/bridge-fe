import { Button, IconButton, Stack, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ProfileCard } from "./ProfileCard.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  mobile?: boolean;
};

export const Header = ({ mobile }: Props) => {
  const isMobile =
    mobile || useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      pt={{ xs: 2, lg: 5 }}
      px={{ xs: 2, lg: 5 }}
    >
      <Link to="/">
        <img src={logo} alt="logo" width={160} />
      </Link>

      <Stack gap={3} alignItems="center" direction="row">
        <IconButton
          sx={{
            backgroundColor: "grey.200",
            "&:hover": {
              backgroundColor: "grey.300",
            },
            color: "grey.600",
          }}
        >
          <NotificationsNoneIcon />
        </IconButton>

        {isMobile ? (
          <IconButton
            sx={{
              backgroundColor: "grey.200",
              "&:hover": {
                backgroundColor: "grey.300",
              },
              color: "grey.600",
            }}
          >
            <SwapHorizIcon />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<SwapHorizIcon />}
          >
            Switch to Passenger
          </Button>
        )}

        <ProfileCard />
      </Stack>
    </Stack>
  );
};
