import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const menuItems = [
  {
    text: "Overview",
    link: "",
  },
  {
    text: "Orders",
    link: "orders",
  },
];

export const HomepageTabs = ({ showAction }: { showAction: boolean }) => {
  const currentPathname = location.pathname.replace("/", "");

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
          to="/create-order"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mb: 0.5,
          }}
        >
          Create Order
        </Button>
      )}
    </Stack>
  );
};
