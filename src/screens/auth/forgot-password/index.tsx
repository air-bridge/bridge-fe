import { Button, Stack } from "@mui/material";
import { ForgotPasswordForm } from "../../../components/forgot-password-form";
import { useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { useState } from "react";
import { ChangePasswordTabState } from "./constant.ts";
import { OTPForm } from "../../../components/otp-form";
import { SetPasswordForm } from "../../../components/set-password-form";
import { PasswordChangedCompleted } from "../../../components/forgot-password-form/PasswordChangedCompleted.tsx";
import { RegistrationContextProvider } from "../../../context/registration";
import { AccountAction } from "../../../context/registration/constant.ts";

const ForgotPasswordScreen = () => {
  const [activeTab, setActiveTab] = useState(ChangePasswordTabState.REQUEST);
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (activeTab === ChangePasswordTabState.REQUEST) {
      navigate("/account");
    } else if (activeTab === ChangePasswordTabState.OTP_VERIFICATION) {
      setActiveTab(ChangePasswordTabState.REQUEST);
    } else if (activeTab === ChangePasswordTabState.SET_PASSWORD) {
      setActiveTab(ChangePasswordTabState.OTP_VERIFICATION);
    }
  };

  return (
    <RegistrationContextProvider>
      <Stack gap={{ xs: 4, lg: 10 }} pb={{ xs: 2, lg: 6 }}>
        <Stack gap={0.5} direction="row" alignItems="center">
          {activeTab !== ChangePasswordTabState.COMPLETED && (
            <Button
              size="small"
              variant="text"
              color="inherit"
              startIcon={<WestIcon fontSize="small" />}
              onClick={handleGoBack}
            >
              Back
            </Button>
          )}
        </Stack>
        <Stack
          gap={{ xs: 2, lg: 3 }}
          sx={{ width: { xs: "90%", lg: 450 }, m: "auto" }}
        >
          <Stack gap={{ xs: 1, lg: 2 }}>
            {activeTab === ChangePasswordTabState.REQUEST && (
              <ForgotPasswordForm
                onNext={() => {
                  setActiveTab(ChangePasswordTabState.OTP_VERIFICATION);
                }}
              />
            )}

            {activeTab === ChangePasswordTabState.OTP_VERIFICATION && (
              <OTPForm
                action={AccountAction.VERIFY_OTP}
                onNext={() => setActiveTab(ChangePasswordTabState.SET_PASSWORD)}
              />
            )}

            {activeTab === ChangePasswordTabState.SET_PASSWORD && (
              <SetPasswordForm
                onNext={() => setActiveTab(ChangePasswordTabState.COMPLETED)}
              />
            )}

            {activeTab === ChangePasswordTabState.COMPLETED && (
              <PasswordChangedCompleted />
            )}
          </Stack>
        </Stack>
      </Stack>
    </RegistrationContextProvider>
  );
};

export default ForgotPasswordScreen;
