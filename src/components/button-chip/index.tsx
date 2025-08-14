import { Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Props = {
  label: string;
  selected?: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onClick?: () => void;
};

export const ButtonChip = ({ label, Icon, selected, onClick }: Props) => {
  const clickable = !!onClick;

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        border: "solid 1px",
        borderColor: selected ? "primary.main" : "grey.900",
        borderRadius: 2,
        px: 1.5,
        py: 1,
        flexShrink: 0,
        width: "fit-content",
        cursor: clickable ? "pointer" : "unset",
        color: selected ? "primary.main" : "text.primary",
      }}
      onClick={clickable ? onClick : undefined}
    >
      <Icon fontSize="small" />

      <Typography
        variant="body2"
        color={selected ? "primary.main" : "text.primary"}
      >
        {label}
      </Typography>
    </Stack>
  );
};
