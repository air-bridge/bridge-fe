import { Stack } from "@mui/material";
import { useUserContext } from "../../../context/user/util.ts";
import { SenderDashboard } from "./SenderDashboard.tsx";
import { PassengerDashboard } from "./PassengerDashboard.tsx";

const HomeScreen = () => {
  const { isSender } = useUserContext();
  return (
    <Stack gap={3}>
      {isSender ? <SenderDashboard /> : <PassengerDashboard />}
    </Stack>
  );
};

export default HomeScreen;
