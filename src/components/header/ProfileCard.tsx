import { Box, Stack, Theme, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import profileAvatar from "../../assets/images/profile.png";
import { useState } from "react";
import OutsideClickHandler from "../../hooks/useOutsideClickHandler.tsx";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "../../context/user/util.ts";

const menuItems = [
  {
    text: "Profile Information",
    link: "/profile",
    highlight: false,
  },
  {
    text: "Privacy Policy",
    link: "/contact",
    highlight: false,
  },
  {
    text: "Log out",
    link: "/account",
    highlight: true,
  },
];

export const ProfileCard = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { currentUser } = useUserContext();

  const [expanded, setExpanded] = useState(false);
  return (
    <OutsideClickHandler onOutsideClick={() => setExpanded(false)}>
      <Box
        p={0.75}
        sx={{
          position: "relative",
          border: "solid 1px",
          borderColor: "grey.300",
        }}
        borderRadius={3}
      >
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          onClick={() => setExpanded(!expanded)}
          sx={{
            cursor: "pointer",
          }}
        >
          <img src={profileAvatar} alt="profile" width={40} />
          {!isMobile && currentUser && (
            <Box>
              <Typography variant="subtitle2">{`${currentUser?.firstname} ${currentUser?.lastname}`}</Typography>
              <Typography variant="caption">{`Hey ${currentUser?.firstname}`}</Typography>
            </Box>
          )}

          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Stack>

        <Box
          data-testid="menu-container"
          sx={{
            top: 71,
            right: 0,
            position: "absolute",
            width: 400,
            height: expanded ? "auto" : 0,
            zIndex: 2,
            overflow: "hidden",
            transition: "all 0.5s ease-in-out",
            bgcolor: "white",
            borderRadius: 3,
          }}
        >
          <Stack gap={2} m={2}>
            {menuItems.map((menu) => (
              <Stack
                key={menu.link}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                bgcolor="grey.100"
                px={2}
                py={1.5}
                borderRadius={2}
                component={Link}
                to={menu.link}
                sx={{
                  cursor: "pointer",
                  border: "solid 1px",
                  borderColor: "grey.200",
                  "&:hover": {
                    bgcolor: "grey.200",
                  },
                }}
                onClick={() => {
                  setExpanded(false);
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "600",
                    color: menu.highlight ? "error.main" : "text.primary",
                  }}
                >
                  {menu.text}
                </Typography>
                <NavigateNextIcon sx={{ color: "grey.600" }} />
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </OutsideClickHandler>
  );
};
