import { useRef, ChangeEvent, useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";
import { Cancel } from "@mui/icons-material";

type Props = {
  onChange: (file: File | string) => void;
  file?: string | File | null;
  editable?: boolean;
};
export const PhotoInput = ({ onChange, editable, file }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoSource, setPhotoSource] = useState<string | null>(null);

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files instanceof FileList && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoSource(reader.result);
        }
      };

      onChange(file);

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
    onChange("");
  };

  useEffect(() => {
    if (typeof file === "string") {
      setPhotoSource(file);
    }

    if (file instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoSource(reader.result);
        }
      };
    }
  }, [file]);

  return (
    <StyledUploadContainer
      filled={photoSource ? "true" : "false"}
      editable={editable ? "true" : "false"}
      data-testid="upload-container"
      onClick={() => {
        if (!photoSource && editable) {
          inputRef.current?.click();
        }
      }}
    >
      {photoSource ? (
        <Box>
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
        <ImageIcon sx={{ fontSize: 60 }} />
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

export const StyledUploadContainer = styled(Stack)<{
  filled?: string;
  editable?: string;
}>(({ theme, filled, editable }) => ({
  border: "dashed 1px",
  borderColor: "grey.900",
  borderRadius: theme.shape.borderRadius * 2,
  justifyContent: "center",
  position: "relative",
  alignItems: "center",
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
  ...(editable === "true" && {
    cursor: "pointer",
  }),
  ...(filled === "true" && {
    borderColor: "transparent",
    height: "unset",
  }),
  [theme.breakpoints.down("lg")]: {
    height: "90px",
  },
}));
