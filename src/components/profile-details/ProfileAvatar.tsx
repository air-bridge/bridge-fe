import { Avatar, Box, Button, Stack, Theme, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
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
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 3 }}>
        <Stack gap={3}>
          <Stack gap={1.5}>
            <Typography variant="subtitle2">Profile photo</Typography>
            <Typography variant="body2" color="text.secondary">
              This image will be displayed on your profile
            </Typography>
          </Stack>

          {!isMobile && (
            <Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ImageIcon />}
              >
                Change Photo
              </Button>
            </Box>
          )}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }} offset={{ xs: 0, lg: 2 }}>
        <Avatar
          sx={{
            width: isMobile ? "65px" : "130px",
            height: isMobile ? "65px" : "130px",
            fontSize: "32px",
          }}
        >
          {`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
        </Avatar>

        {isMobile && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<ImageIcon />}
            sx={{ mt: 1.5 }}
          >
            Change Photo
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
