import { useState, useLayoutEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { Signup } from "../../../components/signup";
import { SignIn } from "../../../components/signin";
import { AccountTabState } from "../../../components/signin/constant.ts";

const Account = () => {
  const [activeTab, setActiveTab] = useState(AccountTabState.LOGIN);
  const [contentHeight, setContentHeight] = useState("auto");
  const contentRef = useRef<HTMLDivElement | null>(null);

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
    <Box
      sx={{
        height: contentHeight,
        overflowY: "hidden",
        transition: "height 0.5s ease",
      }}
    >
      <Box ref={contentRef}>
        {activeTab === AccountTabState.LOGIN && (
          <SignIn onChange={() => setActiveTab(AccountTabState.REGISTER)} />
        )}
        {activeTab === AccountTabState.REGISTER && (
          <Signup onChange={() => setActiveTab(AccountTabState.LOGIN)} />
        )}
      </Box>
    </Box>
  );
};

export default Account;
