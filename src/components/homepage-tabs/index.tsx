import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

export const HomepageTabs = () => {
  const currentPathname = location.pathname.replace("/", "");

  return (
    <Stack
      gap={1}
      direction="row"
      alignItems="center"
      sx={{ borderBottom: "1px solid", borderBottomColor: "grey.300" }}
    >
      {menuItems.map((item, index) => {
        const isActive = item.link === currentPathname;
        return (
          <Typography
            key={index}
            component={Link}
            to={`/${item.link}`}
            px={2}
            py={0.75}
            textAlign="center"
            sx={{
              color: isActive ? "primary.main" : "text.primary",
              fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? "2px solid" : "none",
              borderBottomColor: "primary.main",
            }}
          >
            {item.text}
          </Typography>
        );
      })}
    </Stack>
  );
};
