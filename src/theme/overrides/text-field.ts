import { Components } from "@mui/material/styles";
import type { Theme } from "..";

const TextField: Components<Theme>["MuiTextField"] = {
  variants: [],
  defaultProps: {
    size: "medium",
  },
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiChip-root": {
        height: "auto",
      },
      "& .MuiInputBase-root.Mui-disabled": {
        backgroundColor: theme.palette.grey[100],
      },
      "& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[200],
      },
    }),
  },
};

export default TextField;
