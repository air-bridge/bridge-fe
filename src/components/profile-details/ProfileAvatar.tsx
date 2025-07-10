import {
  Avatar,
  Box,
  Button,
  Grid2,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useUserContext } from "../../context/user/util.ts";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ProfileAvatar = () => {
  const { currentUser } = useUserContext();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  const name = `${currentUser?.firstname} ${currentUser?.lastname}`;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, lg: 3 }} order={{ xs: 2, lg: 1 }}>
        <Stack gap={3}>
          <Stack gap={1.5}>
            <Typography variant="subtitle2">Profile photo</Typography>
            <Typography variant="body2" color="text.secondary">
              This image will be displayed on your profile
            </Typography>
          </Stack>

          <Box>
            <Button variant="outlined" color="error" startIcon={<ImageIcon />}>
              Change Photo
            </Button>
          </Box>
        </Stack>
      </Grid2>

      <Grid2
        size={{ xs: 12, lg: 7 }}
        offset={{ xs: 0, lg: 2 }}
        order={{ xs: 1, lg: 2 }}
      >
        <Avatar
          sx={{
            width: isMobile ? "65px" : "130px",
            height: isMobile ? "65px" : "130px",
            fontSize: "32px",
          }}
        >
          {`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
        </Avatar>
      </Grid2>
    </Grid2>
  );
};
