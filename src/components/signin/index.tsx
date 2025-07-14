import { Stack, Typography } from "@mui/material";
import { SignInForm } from "./SignInForm.tsx";
import MUILink from "@mui/material/Link";
import { AccountTabState, LoginTabState } from "./constant.ts";
import { useState } from "react";
import { SendOTP } from "./SendOTP.tsx";
import { OTPForm } from "../otp-form";
import { useRegistrationContext } from "../../context/registration/util.ts";
import { useNavigate } from "react-router-dom";

type Props = {
  onNext: (arg: AccountTabState) => void;
};
export const SignIn = ({ onNext }: Props) => {
  const [activeTab, setActiveTab] = useState(LoginTabState.LOGIN);
  const { payload } = useRegistrationContext();
  const navigate = useNavigate();

  const handleOnVerified = () => {
    navigate("/account");
  };

  return (
    <Stack gap={2}>
      {activeTab === LoginTabState.LOGIN && (
        <SignInForm
          handleVerifyStatus={() => setActiveTab(LoginTabState.UNVERIFIED)}
        />
      )}

      {activeTab === LoginTabState.UNVERIFIED && (
        <SendOTP onNext={() => setActiveTab(LoginTabState.OTP_VERIFICATION)} />
      )}

      {activeTab === LoginTabState.OTP_VERIFICATION && (
        <OTPForm email={payload.email} onNext={handleOnVerified} />
      )}

      <Typography variant="body1" color="text.secondary" textAlign="center">
        Not a member yet?&nbsp;
        <MUILink
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNext(AccountTabState.REGISTER);
          }}
        >
          Sign Up
        </MUILink>
      </Typography>
    </Stack>
  );
};
