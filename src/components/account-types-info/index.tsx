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
  BusinessCenter,
  People,
  RadioButtonChecked,
} from "@mui/icons-material";
import { ACCOUNT_TYPE } from "../../context/registration/constant.ts";

const data = [
  {
    title: "Sender",
    value: ACCOUNT_TYPE.Sender,
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
    value: ACCOUNT_TYPE.Passenger,
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

type Props = {
  accountType: string | null;
  onSelect: (rg: string) => void;
};

export const AccountTypesInfo = ({ accountType, onSelect }: Props) => {
  return (
    <Stack gap={2} direction={{ xs: "column", lg: "row" }}>
      {data.map(({ title, description, value, Icon, features }, index) => (
        <Box
          key={index}
          data-testid={title}
          sx={{
            borderRadius: 3,
            px: 1.5,
            py: 2,
            cursor: "pointer",
            bgcolor: "grey.100",
            border: "solid 2px",
            borderColor: accountType === value ? "grey.900" : "transparent",
            "&:hover": { borderColor: "grey.900" },
          }}
          onClick={() => onSelect(value)}
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
