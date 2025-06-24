import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <Box>
      <Typography variant="h3">Welcome Back,</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Typography>
      <Link to="/account">Sign in</Link>
    </Box>
  );
};

export default HomeScreen;
