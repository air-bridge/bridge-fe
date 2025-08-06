import { PoolList } from "../../../components/pool-list";
import {
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const options = [
  {
    value: "filter",
    label: "Filter by",
  },
  {
    value: "Date",
    label: "Date",
  },
  {
    value: "Status",
    label: "Status",
  },
];
const PoolListScreen = () => {
  return (
    <Stack gap={4}>
      <Typography variant="h4">Pool List</Typography>

      <Stack direction="row" alignItems="center" gap={2}>
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

        <TextField
          variant="outlined"
          size="small"
          select
          placeholder="Filter by"
          sx={{ minWidth: 200 }}
          value={options[0].value}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <PoolList />

      <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
        <Pagination page={1} count={10} />
      </Stack>
    </Stack>
  );
};

export default PoolListScreen;
