import {
  Box,
  Card,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import RedeemIcon from "@mui/icons-material/Redeem";

const data = [
  {
    name: "Total Request",
    count: "20+",
    background: "info.light",
    color: "primary.main",
  },
  {
    name: "Active Request",
    count: "15+",
    background: "warning.light",
    color: "warning.main",
  },
  {
    name: "Successful Sent Goods",
    count: "5+",
    background: "success.light",
    color: "success.main",
  },
];

export const OverviewStats = () => {
  return (
    <Card>
      <CardContent sx={{ px: 6, pt: 6, mb: 4 }}>
        <Grid2 container spacing={6}>
          {data.map((item, index) => (
            <Grid2 size={{ xs: 4 }}>
              <Stack
                key={index}
                gap={3}
                sx={{
                  pr: index === 2 ? 0 : 3,
                  borderRight: index === 2 ? "none" : "solid 1px",
                  borderRightColor: "grey.300",
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    borderRadius: 3,
                    width: 63,
                    height: 63,
                    bgcolor: item.background,
                  }}
                >
                  <RedeemIcon sx={{ fontSize: 35, color: item.color }} />
                </Stack>
                <Box>
                  <Typography variant="subtitle1" mb={0.75}>
                    {item.count}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="text.secondary" variant="body2">
                      {item.name}
                    </Typography>

                    <ArrowOutwardIcon sx={{ color: "grey.900" }} />
                  </Stack>
                </Box>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
};
