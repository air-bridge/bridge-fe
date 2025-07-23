import { Stack } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { useUserContext } from "../../../context/user/util.ts";
import { SenderDashboard } from "./SenderDashboard.tsx";
import { PassengerDashboard } from "./PassengerDashboard.tsx";
import { SenderOverviewStats } from "../../../components/stats/SenderOverViewStats.tsx";
import { PassengerOverviewStats } from "../../../components/stats/PassengerOverViewStats.tsx";

type Props = {
  count?: number;
};
const HomeScreen = ({ count = 0 }: Props) => {
  const { isSender } = useUserContext();
  return (
    <Stack gap={2}>
      <HomepageTabs showAction={count > 0} />

      {isSender ? (
        <>
          <SenderOverviewStats />
          <SenderDashboard count={count} />
        </>
      ) : (
        <>
          <PassengerOverviewStats />
          <PassengerDashboard count={count} />
        </>
      )}
    </Stack>
  );
};

export default HomeScreen;
