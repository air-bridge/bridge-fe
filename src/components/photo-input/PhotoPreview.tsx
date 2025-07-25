import { useRef, useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";

type Props = {
  file: File;
};
export const PhotoPreview = ({ file }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoSource, setPhotoSource] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoSource(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <StyledUploadContainer
      filled={photoSource ? "true" : "false"}
      data-testid="upload-container"
      onClick={() => {
        if (!photoSource) {
          inputRef.current?.click();
        }
      }}
    >
      {photoSource ? (
        <Box sx={{ position: "relative" }}>
          <img
            alt="photo"
            src={photoSource}
            width="100%"
            height="100%"
            style={{ borderRadius: "8px" }}
          />
        </Box>
      ) : (
        <ImageIcon sx={{ fontSize: 60 }} />
      )}
    </StyledUploadContainer>
  );
};

export const StyledUploadContainer = styled(Stack)<{ filled?: string }>(
  ({ theme, filled }) => ({
    border: "dashed 1px",
    borderColor: "grey.900",
    borderRadius: theme.shape.borderRadius * 2,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    height: "150px",
    maxHeight: "150px",
    overflow: "hidden",
    "& input[type='file']": {
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    },
    ...(filled === "true" && {
      borderColor: "transparent",
      height: "unset",
    }),
    [theme.breakpoints.down("lg")]: {
      height: "90px",
    },
  }),
);
