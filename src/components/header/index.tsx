import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Theme,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ProfileCard } from "./ProfileCard.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "../../context/user/util.ts";
import { useMutation } from "@tanstack/react-query";
import { switchRole } from "../../api/auth.ts";
import {
  AlertType,
  useNotificationContext,
} from "../../context/notification/util.ts";
import { ACCOUNT_TYPE } from "../../context/registration/constant.ts";

export const Header = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { isSender, refetchProfile } = useUserContext();
  const { openNotification } = useNotificationContext();

  const { mutate, isPending } = useMutation({
    mutationFn: switchRole,
    onSuccess: () => {
      refetchProfile();
      openNotification("Role switched successfully.");
    },
    onError: (error) => {
      openNotification(error?.message, AlertType.ERROR);
    },
  });

  const handleSwitch = () => {
    mutate(isSender ? ACCOUNT_TYPE.Passenger : ACCOUNT_TYPE.Sender);
  };

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
            disabled={isPending}
            onClick={handleSwitch}
            loading={isPending}
            loadingIndicator={<CircularProgress color="inherit" />}
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
            onClick={handleSwitch}
            startIcon={<SwapHorizIcon />}
            disabled={isPending}
            loading={isPending}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            {isSender ? "Switch to Passenger" : "Switch to Sender"}
          </Button>
        )}

        <ProfileCard />
      </Stack>
    </Stack>
  );
};
