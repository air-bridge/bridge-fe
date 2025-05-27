import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  People,
  RadioButtonChecked,
  BusinessCenter,
} from "@mui/icons-material";

const data = [
  {
    title: "Sender",
    Icon: People,
    description: "A sender is a person that want to send goods out.",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
      "Feature 6",
    ],
  },
  {
    title: "Passenger",
    Icon: BusinessCenter,
    description: "These are people that have space to help carry goods ",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
      "Feature 6",
    ],
  },
];
export const AccountTypesInfo = () => {
  return (
    <Stack gap={2} direction={{ xs: "column", lg: "row" }}>
      {data.map(({ title, description, Icon, features }, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 3,
            px: 1.5,
            py: 2,
            bgcolor: "grey.100",
            border: "solid 2px",
            borderColor: "transparent",
            "&:hover": { borderColor: "grey.900" },
          }}
        >
          <Stack gap={1} direction="row">
            <Icon />
            <Stack alignItems="flex-start">
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <List>
                {features.map((feature, index) => (
                  <ListItem key={index} disableGutters disablePadding>
                    <ListItemIcon
                      sx={{ color: "text.secondary", minWidth: "25px" }}
                    >
                      <RadioButtonChecked fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "text.secondary" }}
                      disableTypography
                    >
                      {feature}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
