import { Box, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import profileAvatar from "../../assets/images/profile.png";

export const ProfileCard = () => {
  return (
    <Box
      p={0.75}
      sx={{ border: "solid 1px", borderColor: "grey.300" }}
      borderRadius={3}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <img src={profileAvatar} alt="profile" width={40} />

        <Box>
          <Typography variant="subtitle2">Robert Allen</Typography>
          <Typography variant="caption">Hey Robert</Typography>
        </Box>

        <ExpandMoreIcon />
      </Stack>
    </Box>
  );
};
