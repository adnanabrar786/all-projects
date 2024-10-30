import { Button, Stack, SxProps } from "@mui/material";
import UploadFilledButton from "components/common/Button/UploadFilledButton";
import { LoadingDarkIcon } from "constants/images.routes";
import Image from "next/image";
import { ChangeEventHandler } from "react";

interface Props {
  avatar: string;
  setAvatar: (avatar: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  loading?: boolean;
  disabled?: boolean;
  text: string;
  sxRow?: SxProps;
}
const UploadAndRemoveImage = ({
  avatar,
  setAvatar,
  onChange,
  loading,
  text,
  sxRow,
  disabled,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        marginTop: "2.4rem",
        alignItems: "center",
        gap: "2.7rem",
        ...sxRow,
      }}
    >
      <UploadFilledButton
        disabled={disabled}
        secondary
        text={
          avatar && !avatar?.includes("http") && !loading
            ? "Replace Image"
            : loading
            ? "Uploading..."
            : text
        }
        onClick={() => {}}
        sx={{ height: "2.5rem" }}
        startIcon={
          loading ? (
            <Image
              className={"rotating"}
              priority
              src={LoadingDarkIcon}
              alt={"icon"}
              width={21}
              height={20}
            />
          ) : null
        }
      >
        <input
          multiple
          hidden
          accept="image/*"
          type="file"
          onClick={(e: any) => {
            e.target.value = null;
          }}
          onChange={onChange}
        />
      </UploadFilledButton>

      {!loading && avatar && !avatar?.includes("http") && (
        <Button
          onClick={() => {
            setAvatar("");
          }}
          disableRipple
          sx={{
            color: "#B32318",
            ":hover": { backgroundColor: "transparent" },
          }}
        >
          Remove
        </Button>
      )}
    </Stack>
  );
};

export default UploadAndRemoveImage;
