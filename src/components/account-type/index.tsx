import { Box, Button, Stack, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { AccountTypesInfo } from "../account-types-info";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AccountTabState } from "../signin/constant.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";

type Props = {
  onNext: (arg: AccountTabState) => void;
};

export const AccountType = ({ onNext }: Props) => {
  const { payload, setRegistrationInfo } = useRegistrationContext();
  const userAccountType = payload.role;

  return (
    <Stack gap={{ xs: 4, lg: 10 }}>
      <Stack gap={0.5} direction="row" alignItems="center">
        <Button
          size="small"
          variant="text"
          color="inherit"
          startIcon={<WestIcon fontSize="small" />}
          onClick={() => onNext(AccountTabState.REGISTER)}
        >
          Back
        </Button>
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

        <AccountTypesInfo
          accountType={userAccountType}
          onSelect={(arg) =>
            setRegistrationInfo({
              role: arg,
            })
          }
        />

        <Box sx={{ width: { xs: "100%", lg: "60%" }, m: "auto" }}>
          <Button
            disabled={!userAccountType}
            fullWidth
            variant="contained"
            endIcon={<ChevronRightIcon />}
            onClick={() => onNext(AccountTabState.PROFILE_DATA)}
          >
            Continue
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
