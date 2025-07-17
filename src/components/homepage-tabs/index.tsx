import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useUserContext } from "../../context/user/util.ts";

const senderMenuItems = [
  {
    text: "Overview",
    link: "",
  },
  {
    text: "Orders",
    link: "orders",
  },
];

const passengerMenuItems = [
  {
    text: "Overview",
    link: "",
  },
  {
    text: "Services",
    link: "services",
  },
];

export const HomepageTabs = ({ showAction }: { showAction: boolean }) => {
  const { isSender } = useUserContext();
  const currentPathname = location.pathname.replace("/", "");
  const menuItems = isSender ? senderMenuItems : passengerMenuItems;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderBottom: "1px solid", borderBottomColor: "grey.300" }}
    >
      <Stack gap={1} direction="row" alignItems="center" position="relative">
        {menuItems.map((item, index) => {
          const isActive = item.link === currentPathname;
          return (
            <Button
              key={index}
              component={Link}
              to={`/${item.link}`}
              variant="text"
              color={isActive ? "primary" : "inherit"}
              sx={{
                borderRadius: 0,
                fontWeight: isActive ? 600 : 500,
                borderBottom: isActive ? "2px solid" : "none",
                borderBottomColor: "primary.main",
              }}
            >
              {item.text}
            </Button>
          );
        })}
      </Stack>

      {showAction && (
        <Button
          component={Link}
          to={isSender ? "/create-order" : "/create-service"}
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mb: 0.5,
          }}
        >
          {isSender ? "Create Order" : "Create Service"}
        </Button>
      )}
    </Stack>
  );
};
