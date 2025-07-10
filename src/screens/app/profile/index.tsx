import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import { ProfileAvatar } from "../../../components/profile-details/ProfileAvatar.tsx";
import { PersonalDetails } from "../../../components/profile-details/PersonalDetails.tsx";

export const ProfileScreen = () => {
  return (
    <Stack gap={{ xs: 1, lg: 2 }}>
      <Box
        sx={{ borderBottom: "solid 1px", borderBottomColor: "divider" }}
        py={{ xs: 0.5, lg: 1.5 }}
      >
        <Button
          component={Link}
          to="/"
          size="small"
          variant="text"
          color="inherit"
          startIcon={<WestIcon fontSize="small" />}
        >
          Back
        </Button>
      </Box>

      <Container fixed sx={{ px: 0, py: { xs: 1, lg: 2 } }}>
        <Typography variant="h4">Profile Information</Typography>

        <Card
          sx={{
            px: { xs: 2, lg: 4 },
            py: { xs: 1.75, lg: 3.5 },
            my: { xs: 1, lg: 2 },
          }}
        >
          <CardContent>
            <Stack gap={{ xs: 2, lg: 4 }}>
              <ProfileAvatar />
              <Divider />

              <PersonalDetails />
              <Divider />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
};

export default ProfileScreen;
