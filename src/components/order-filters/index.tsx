import { Box, Stack, TextField, Typography } from "@mui/material";
import { serviceCategories } from "./util.ts";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {
  initialPayload,
  useOrderSearchContext,
} from "../../context/orders-search/util.ts";

export const OrderFilters = () => {
  const { payload, setPayload } = useOrderSearchContext();

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      gap={{ xs: 2, lg: 1 }}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        {serviceCategories.map((category) => {
          const isActive = category.value === payload.status;

          return (
            <Box
              key={category.value}
              component={Typography}
              variant="body2"
              px={1}
              py={1.25}
              borderRadius={1}
              bgcolor={isActive ? "primary.light" : "transparent"}
              color={isActive ? "primary.main" : "text.secondary"}
              fontWeight={isActive ? 500 : 400}
              onClick={() => {
                setPayload({ ...initialPayload, status: category.value });
              }}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "primary.light",
                },
              }}
            >
              {category.label}
            </Box>
          );
        })}
      </Stack>

      <TextField
        size="small"
        type="search"
        placeholder="Search by location, price"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
};
