import { Avatar, Stack } from "@mui/material";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import UploadAndRemoveImage from "components/common/Button/UploadAndRemoveImage";
import CustomDivider from "components/common/Divider/CustomDivider";
import HintText from "components/common/HintText";
import ImageCropperDialog from "components/common/ImageCropperDialog/ImageCropperDialog";
import TextLg from "components/common/Text/TextLg";
import TextMd from "components/common/Text/TextMd";
import { BuildingIcon, UserIcon } from "constants/images.routes";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { setImageNameByTime } from "utils/images";

interface Props {
  title: string;
  subTitle: string;
  imageHint: string;
  uploadImageText: string;
  showSaveButton: boolean;
  loadingImage: boolean;
  setShowSaveButton: (showSaveButton: boolean) => void;
  revertChanges: () => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  loading?: boolean;
  circularStencil?: boolean;
  setAvatarFileType: (data: { type: string; name: string }) => void;
}
const PersonalCompanyTitleImage = ({
  title,
  subTitle,
  imageHint,
  uploadImageText,
  showSaveButton,
  setShowSaveButton,
  revertChanges,
  avatar,
  setAvatar,
  loadingImage,
  loading,
  circularStencil,
  setAvatarFileType,
}: Props) => {
  const [tempAvatar, setTempAvatar] = useState("");
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const pathname = usePathname();

  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAvatarFileType({
        name: setImageNameByTime(file.name),
        type: file.type,
      });
      setTempAvatar(URL.createObjectURL(file));
      setOpenChangeImage(true);
    }
    event.target.value = "";
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "61.9375rem",
        }}
      >
        <TextLg
          text={title}
          sx={{
            fontWeight: "400",
            fontSize: "3rem",
            letterSpacing: "-0.06rem",
            lineHeight: "3.75rem",
          }}
        />
        <SaveAndCancelButton
          loading={loading}
          disabled={showSaveButton}
          save="Save Changes"
          type={"submit"}
          hideCancelButton={showSaveButton}
          onClickCancel={revertChanges}
          sx={{ flexDirection: "row-reverse" }}
        />
      </Stack>

      <Stack sx={{ paddingTop: "2.75rem" }}>
        <TextMd text={subTitle} />

        <HintText
          text={imageHint}
          sx={{
            marginTop: "0.44rem",
            fontSize: "0.8125rem",
          }}
        />

        <Stack
          direction={"row"}
          sx={{ alignItems: "center", marginTop: "1.5rem", gap: "1.25rem" }}
        >
          {avatar ? (
            <Avatar
              src={avatar}
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                padding: "1rem",
                backgroundColor: "transparent",
                color: "black",
                img: {
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                  objectFit: "contain",
                },
              }}
            />
          ) : (
            <Avatar
              src={
                pathname.includes("personal-settings") ? UserIcon : BuildingIcon
              }
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                padding: "1rem",
                backgroundColor: "var(--background-color1)",
                color: "black",
                img: {
                  width: "2.5rem",
                  height: "2.5rem",
                },
              }}
            />
          )}

          <UploadAndRemoveImage
            disabled={loading}
            loading={loadingImage}
            text={uploadImageText}
            avatar={avatar}
            setAvatar={setAvatar}
            onChange={onLoadImage}
            sxRow={{ marginTop: "0" }}
          />
        </Stack>
      </Stack>

      <CustomDivider
        sx={{
          marginTop: "2.19rem",
          marginBottom: "1.75rem",
          maxWidth: "63rem",
        }}
      />

      <ImageCropperDialog
        setShowSaveButton={setShowSaveButton}
        openChangeImage={openChangeImage}
        setOpenChangeImage={setOpenChangeImage}
        setAvatar={setAvatar}
        tempAvatar={tempAvatar}
        circularStencil={circularStencil}
      />
    </>
  );
};

export default PersonalCompanyTitleImage;
