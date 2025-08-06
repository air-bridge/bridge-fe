import { Box, Button, Stack, Theme, Typography } from "@mui/material";
import poolImage from "../../assets/images/pool-access.png";
import StarIcon from "@mui/icons-material/Star";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
};
export const MatchTrigger = ({ onClose }: Props) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const navigate = useNavigate();

  const handlePay = () => {
    //   TODO: redirect to payment portal
    navigate("/pool-list");
  };
  return (
    <Stack direction={{ xs: "column", lg: "row" }} gap={{ xs: 3, lg: 6 }}>
      <Box
        sx={{
          width: isMobile ? "unset" : 200,
          height: isMobile ? 150 : "unset",
          backgroundImage: `url(${poolImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></Box>

      <Stack
        gap={6}
        sx={{ height: "100%", maxWidth: { xs: "100%", lg: 600 } }}
        justifyContent="space-between"
      >
        <Stack gap={{ xs: 1, lg: 2 }}>
          <Typography variant={isMobile ? "h2" : "h1x"} color="white">
            We found a match!
          </Typography>
          <Typography color="white" variant={isMobile ? "body2" : "body2x"}>
            Payment has to be made to get access to the pool list of matched
            passengers
          </Typography>

          <Stack
            gap={{ xs: 0, lg: 3 }}
            sx={{ width: { xs: "100%", lg: "90%" } }}
          >
            <Stack sx={{ mt: { xs: 0, lg: 5 } }} gap={{ xs: 1, lg: 2 }}>
              <Stack direction="row" gap={1}>
                <StarIcon sx={{ color: "white" }} />
                <Typography
                  color="white"
                  variant={isMobile ? "body2" : "body2x"}
                  fontWeight="300"
                >
                  Search result are created based on your request to get you the
                  perfect match
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ mt: 2 }} gap={{ xs: 1, lg: 2 }}>
              <Stack direction="row" gap={1}>
                <StarIcon sx={{ color: "white" }} />
                <Typography
                  color="white"
                  variant={isMobile ? "body2" : "body2x"}
                  fontWeight="300"
                >
                  You will be able to filter and choose whosoever match your
                  request from the list
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          {!isMobile && (
            <Button
              size="large"
              variant="text"
              type="submit"
              sx={{ color: "white", textDecoration: "underline" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ px: 3, boxShadow: 0 }}
            endIcon={<ArrowRightAltIcon />}
            fullWidth={isMobile}
            onClick={handlePay}
          >
            Make Payment ($5)
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
