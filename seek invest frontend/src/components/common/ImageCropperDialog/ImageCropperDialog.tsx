import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { useRef } from "react";
import {
  CircleStencil,
  Cropper,
  CropperRef,
  ImageRestriction,
  RectangleStencil,
} from "react-advanced-cropper";

interface Props {
  setAvatar: (avatar: string) => void;
  openChangeImage: boolean;
  setOpenChangeImage: (openChangeImage: boolean) => void;
  tempAvatar: string;
  setShowSaveButton?: (showSaveButton: boolean) => void;
  circularStencil?: boolean;
}

const ImageCropperDialog = ({
  setAvatar,
  openChangeImage,
  setOpenChangeImage,
  tempAvatar,
  setShowSaveButton,
  circularStencil,
}: Props) => {
  const cropperRef = useRef<CropperRef>(null);

  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        setAvatar(canvas.toDataURL());
        if (setShowSaveButton) {
          setShowSaveButton(true);
        }
      }
    }
  };

  return (
    <Dialog
      open={openChangeImage}
      fullWidth
      PaperProps={{
        sx: {
          gap: "20px",
          margin: "0",
          borderRadius: "6px",
          backgroundColor: "white",
          backdropFilter: " blur(45px)",
          border: "1px solid var(--borders-20, rgba(255, 255, 255, 0.20))",
          padding: "20px",
        },
      }}
    >
      <DialogContent>
        <Cropper
          ref={cropperRef}
          crossOrigin="anonymous"
          src={tempAvatar}
          transformImage={{
            adjustStencil: false,
          }}
          imageRestriction={ImageRestriction.stencil}
          stencilComponent={circularStencil ? CircleStencil : RectangleStencil}
        />
      </DialogContent>

      <DialogActions sx={{ px: "1.5rem" }}>
        <Stack sx={{ width: "100%" }} spacing={1}>
          <Stack direction={"row"} sx={{ alignSelf: "flex-end", gap: "10px" }}>
            <Button
              onClick={() => setOpenChangeImage(false)}
              sx={{ color: "black", height: "36px" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onCrop();
                setOpenChangeImage(false);
              }}
              sx={{ color: "black", height: "36px" }}
            >
              Upload
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropperDialog;
