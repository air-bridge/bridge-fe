import { Stack } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { OverViewStats } from "../../../components/stats/OverViewStats.tsx";

const HomeScreen = () => {
  return (
    <Stack gap={3}>
      <HomepageTabs />

      <OverViewStats />
    </Stack>
  );
};

export default HomeScreen;
