import { Button, IconButton, Stack, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ProfileCard } from "./ProfileCard.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "../../context/user/util.ts";

export const Header = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { isSender } = useUserContext();

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      pt={{ xs: 2, lg: 5 }}
      px={{ xs: 2, lg: 5 }}
    >
      <Link to="/">
        <img src={logo} alt="logo" width={isMobile ? 130 : 160} />
      </Link>

      <Stack gap={{ xs: 1, lg: 3 }} alignItems="center" direction="row">
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
            {isSender ? "Switch to Passenger" : "Switch to Sender"}
          </Button>
        )}

        <ProfileCard />
      </Stack>
    </Stack>
  );
};
