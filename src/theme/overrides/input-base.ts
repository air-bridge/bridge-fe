import type { Components, Theme } from "@mui/material/styles";

const InputBase: Components<Theme>["MuiInputBase"] = {
  variants: [
    {
      props: { size: "medium" },
      style: {},
    },
    {
      props: { size: "small" },
      style: {
        "& .MuiInputBase-input.MuiOutlinedInput-input": {
          padding: "10px 12px",
          fontSize: "0.8rem",
        },
        "&.MuiInputBase-root": {
          borderRadius: "6px",
        },
        ".MuiTelInput-IconButton": {
          paddingLeft: 0,
        },
        ".MuiTypography-body1": {
          fontSize: "0.8rem",
        },
        ".MuiInputAdornment-outlined.MuiInputAdornment-sizeSmall": {
          marginRight: "0",
        },
      },
    },
  ],
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "14px",
      },
      "& .MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input": {
        padding: "7.5px 4px 3px 5px",
      },
      "&.MuiInputBase-input::placeholder": {
        color: "#B4C3CE",
      },
      "&.Mui-focused.MuiOutlinedInput-root": {
        border: "none",
      },
      "&.Mui-focused.MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
        {
          borderColor: theme.palette.grey[900],
          borderWidth: 1,
        },
      "&.MuiInputBase-root:hover": {
        border: "none",
      },
      "&.MuiInputBase-root": {
        borderRadius: theme.shape.borderRadius * 4,
      },
      "&.MuiSelect-select MuiSelect-outlined": {
        background: "red",
      },
    }),
  },
};

export default InputBase;
