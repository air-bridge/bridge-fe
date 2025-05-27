import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { AccountTypesInfo } from "../../../components/account-types-info";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AccountTypeScreen = () => {
  return (
    <Stack gap={{ xs: 4, lg: 10 }}>
      <Stack
        gap={0.5}
        direction="row"
        alignItems="center"
        component={Link}
        to="/auth"
        sx={{ color: "text.primary", "&:hover": { color: "text.primary" } }}
      >
        <WestIcon fontSize="small" />
        <Typography variant="body2">Back</Typography>
      </Stack>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <Box>
          <Typography variant="h3" textAlign="center">
            Choose Account Type
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Select the account type that best resonate with you
          </Typography>
        </Box>

        <AccountTypesInfo />

        <Box sx={{ width: { xs: "100%", lg: "60%" }, m: "auto" }}>
          <Button fullWidth variant="contained" endIcon={<ChevronRightIcon />}>
            Continue
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AccountTypeScreen;
