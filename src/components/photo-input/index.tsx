import { useRef, ChangeEvent, useState } from "react";
import { Box, Stack } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";
import { Cancel } from "@mui/icons-material";

export const PhotoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoSource, setPhotoSource] = useState<string | null>(null);

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files instanceof FileList && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoSource(reader.result);
        }
      };
      reader.readAsDataURL(file);

      if (inputRef?.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
    setPhotoSource(null);
  };

  return (
    <StyledUploadContainer
      filled={Boolean(photoSource)}
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

          <Cancel
            onClick={handleRemovePhoto}
            sx={{
              cursor: "pointer",
              position: "absolute",
              top: 0,
              right: 0,
              color: "error.main",
            }}
          />
        </Box>
      ) : (
        <ImageIcon sx={{ fontSize: 40 }} />
      )}

      <input
        ref={inputRef}
        data-testid="photo-input"
        type="file"
        onChange={handleAddImage}
        accept="image/png, image/jpeg"
      />
    </StyledUploadContainer>
  );
};

export const StyledUploadContainer = styled(Stack)<{ filled?: boolean }>(
  ({ theme, filled }) => ({
    padding: filled ? 0 : theme.spacing(4, 3),
    border: "dashed 1px",
    borderColor: "grey.900",
    borderRadius: theme.shape.borderRadius * 2,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "& input[type='file']": {
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    },
    ...(filled && {
      borderColor: "transparent",
    }),
  }),
);
