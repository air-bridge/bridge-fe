import { Box, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import RedeemIcon from "@mui/icons-material/Redeem";
import { styled } from "@mui/material/styles";
import { DashboardStat } from "../../types/dashboard.ts";
import { Loading } from "../loading";

export const OverviewStats = ({
  isLoading,
  isError,
  data,
}: {
  isError: boolean;
  isLoading: boolean;
  data: DashboardStat[];
}) => {
  if (isError) {
    return null;
  }
  return (
    <>
      {isLoading ? (
        <Box sx={{ textAlign: "center" }}>
          <Loading />
        </Box>
      ) : (
        <Wrapper
          sx={{
            borderRadius: 3,
            bgcolor: { xs: "none", lg: "white" },
          }}
        >
          {data.map((item, index) => (
            <Stack
              key={index}
              gap={3}
              sx={{
                width: 270,
                flex: { xs: "0 0 auto", lg: 1 },
                pl: { xs: 2, lg: index === 0 ? 0 : 3 },
                pr: { xs: 2, lg: index === 2 ? 0 : 3 },
                py: { xs: 2, lg: 3 },
                borderRight: {
                  xs: "none",
                  lg: index === 2 ? "none" : "solid 1px",
                },
                borderRightColor: { xs: "none", lg: "grey.300" },
                bgcolor: { xs: "white", lg: "none" },
                borderRadius: { xs: 3, lg: 0 },
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
                  gap={1}
                >
                  <Typography color="text.secondary" variant="body2">
                    {item.name}
                  </Typography>

                  <ArrowOutwardIcon sx={{ color: "grey.900" }} />
                </Stack>
              </Box>
            </Stack>
          ))}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${({ theme }) => theme.spacing(2)};
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${({ theme }) => theme.breakpoints.up("lg")} {
    padding: ${({ theme }) => theme.spacing(2.5, 3)};
  }
`;
