import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Signup } from "../../../components/signup";
import { SignIn } from "../../../components/signin";
import { AccountTabState } from "../../../components/signin/constant.ts";
import { SelectAccountType } from "../../../components/account-type";
import { ProfileSetup } from "../../../components/profile-setup";
import { AccountLayout } from "./AccountLayout.tsx";
import { ProfileSetupCompleted } from "../../../components/profile-setup/ProfileSetupCompleted.tsx";

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

  return (
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
            <SelectAccountType onNext={(step) => setActiveTab(step)} />
          )}
          {activeTab === AccountTabState.PROFILE_DATA && (
            <ProfileSetup onNext={(step) => setActiveTab(step)} />
          )}
          {activeTab === AccountTabState.COMPLETED && <ProfileSetupCompleted />}
        </Box>
      </Box>
    </AccountLayout>
  );
};

export default Account;
