import { useState } from "react";
import { Box } from "@mui/material";
import { Signup } from "../../../components/signup";
import { SignIn } from "../../../components/signin";
import { AccountTabState } from "../../../components/signin/constant.ts";

const Account = () => {
  const [activeTab, setActiveTab] = useState(AccountTabState.LOGIN);
  return (
    <Box
      sx={{
        height: {
          xs: "auto",
          lg: activeTab === AccountTabState.LOGIN ? 470 : 650,
        },
        overflowY: "hidden",
        transition: "all 0.5s ease",
      }}
    >
      {activeTab === AccountTabState.LOGIN && (
        <SignIn onChange={() => setActiveTab(AccountTabState.REGISTER)} />
      )}
      {activeTab === AccountTabState.REGISTER && (
        <Signup onChange={() => setActiveTab(AccountTabState.LOGIN)} />
      )}
    </Box>
  );
};

export default Account;
