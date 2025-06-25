import { Button, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ProfileCard } from "./ProfileCard.tsx";

export const Header = () => {
  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      pt={5}
      px={5}
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
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<SwapHorizIcon />}
        >
          Switch to Passenger
        </Button>

        <ProfileCard />
      </Stack>
    </Stack>
  );
};
