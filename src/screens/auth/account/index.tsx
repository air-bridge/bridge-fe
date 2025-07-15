import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import { Signup } from "../../../components/signup";
import { SignIn } from "../../../components/signin";
import { AccountTabState } from "../../../components/signin/constant.ts";
import { AccountType } from "../../../components/account-type";
import { ProfileSetup } from "../../../components/profile-setup";
import { AccountLayout } from "./AccountLayout.tsx";
import { ProfileSetupCompleted } from "../../../components/profile-setup/ProfileSetupCompleted.tsx";
import { RegistrationContextProvider } from "../../../context/registration";
import { OTPForm } from "../../../components/otp-form";
import { removeAccessToken } from "../../../utils/userAuth.ts";
import { NotificationContextProvider } from "../../../context/notification";
import { AccountAction } from "../../../context/registration/constant.ts";

const tabWithBackground = [AccountTabState.LOGIN, AccountTabState.REGISTER];
const Account = () => {
  const [activeTab, setActiveTab] = useState(AccountTabState.LOGIN);
  const [contentHeight, setContentHeight] = useState("auto");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const showBackgroundImage = tabWithBackground.includes(activeTab);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, []);

  useLayoutEffect(() => {
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab, updateHeight]);

  useEffect(() => {
    removeAccessToken();
  }, []);

  return (
    <NotificationContextProvider>
      <RegistrationContextProvider>
        <AccountLayout showBackgroundImage={showBackgroundImage}>
          <Box
            sx={{
              height: contentHeight,
              overflowY: "hidden",
              transition: "height 0.5s ease",
            }}
          >
            <Box ref={contentRef}>
              {activeTab === AccountTabState.LOGIN && (
                <SignIn onNext={(step) => setActiveTab(step)} />
              )}
              {activeTab === AccountTabState.REGISTER && (
                <Signup onNext={(step) => setActiveTab(step)} />
              )}
              {activeTab === AccountTabState.ACCOUNT_TYPE && (
                <AccountType onNext={(step) => setActiveTab(step)} />
              )}
              {activeTab === AccountTabState.PROFILE_DATA && (
                <ProfileSetup onNext={(step) => setActiveTab(step)} />
              )}
              {activeTab === AccountTabState.OTP_VERIFICATION && (
                <OTPForm
                  action={AccountAction.ACTIVATE_USER}
                  onNext={() => setActiveTab(AccountTabState.COMPLETED)}
                />
              )}
              {activeTab === AccountTabState.COMPLETED && (
                <ProfileSetupCompleted />
              )}
            </Box>
          </Box>
        </AccountLayout>
      </RegistrationContextProvider>
    </NotificationContextProvider>
  );
};

export default Account;
