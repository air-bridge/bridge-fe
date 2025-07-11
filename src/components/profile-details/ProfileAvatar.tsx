import { Avatar, Box, Button, Stack, Theme, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageIcon from "@mui/icons-material/Image";
import { useUserContext } from "../../context/user/util.ts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChangeEvent, useRef, useState } from "react";

export const ProfileAvatar = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  const { currentUser } = useUserContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoSource, setPhotoSource] = useState<string | undefined>();

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files instanceof FileList && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoSource(reader.result);
        }
      };
      reader.readAsDataURL(file);

      if (inputRef?.current) {
        inputRef.current.value = "";
      }
    }
  };

  const selectPhoto = () => {
    inputRef.current?.click();
  };

  const name = `${currentUser?.firstname} ${currentUser?.lastname}`;

  return (
    <>
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
                  data-testid="lg-button"
                  variant="outlined"
                  color="error"
                  startIcon={<ImageIcon />}
                  onClick={selectPhoto}
                >
                  Change photo
                </Button>
              </Box>
            )}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }} offset={{ xs: 0, lg: 2 }}>
          <Avatar
            src={photoSource}
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
              data-testid="mobile-button"
              variant="outlined"
              color="error"
              startIcon={<ImageIcon />}
              sx={{ mt: 1.5 }}
              onClick={selectPhoto}
            >
              Change photo
            </Button>
          )}
        </Grid>
      </Grid>

      <input
        ref={inputRef}
        data-testid="avatar-input"
        type="file"
        onChange={handleAddImage}
        accept="image/png, image/jpeg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
        }}
      />
    </>
  );
};
