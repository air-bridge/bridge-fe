import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import LuggageIcon from "@mui/icons-material/Luggage";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export type LuggageCategory = {
  name: string;
  value: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};
export const luggageCategories: LuggageCategory[] = [
  {
    name: "Box",
    icon: WorkIcon,
    value: "box",
  },
  {
    name: "Documents",
    icon: ArticleIcon,
    value: "document",
  },
  {
    name: "Luggage",
    icon: LuggageIcon,
    value: "luggage",
  },
  {
    name: "Hand Luggage",
    icon: BusinessCenterIcon,
    value: "hand-luggage",
  },
];
