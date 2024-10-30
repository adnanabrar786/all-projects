import { Avatar, MobileStepper, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import ImageCropperDialog from "components/common/ImageCropperDialog/ImageCropperDialog";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import { TEAM_MEMBERS_PERSONAL_DETAILS } from "constants/pages.routes";
import { FormEventHandler, ReactNode } from "react";

interface Props {
  title: string;
  desc: string;
  imageIcon: string;
  fetchingData?: boolean;
  avatar?: string | ArrayBuffer;
  setAvatar: (avatar: string) => void;
  imageText: ReactNode;
  openChangeImage: boolean;
  setOpenChangeImage: (openChangeImage: boolean) => void;
  tempAvatar: string;
  children: ReactNode;
  activeStep: number;
  onClickContinue?: FormEventHandler<HTMLFormElement> | undefined;
  circularStencil?: boolean;
}
const OnboardingContainer = ({
  title,
  desc,
  imageIcon,
  avatar,
  setAvatar,
  imageText,
  openChangeImage,
  setOpenChangeImage,
  tempAvatar,
  children,
  activeStep,
  onClickContinue,
  fetchingData,
  circularStencil,
}: Props) => {
  return (
    <>
      <Stack
        component={"form"}
        onSubmit={onClickContinue}
        sx={{ alignItems: "center", width: "100%" }}
      >
        <TextXl text={title} sx={{ marginTop: "8rem" }} />

        <TextSm
          text={desc}
          sx={{
            marginTop: "1rem",
            color: "var(--color-text-text-secondary, #667085)",
            maxWidth: "37.69381rem",
            textAlign: "center",
            lineHeight: "1.5rem",
          }}
        />

        <Stack sx={{ marginTop: "2rem", alignItems: "center", gap: "0.25rem" }}>
          <Avatar
            //@ts-ignore
            src={avatar || imageIcon}
            sx={{
              width: "5rem",
              height: "5rem",
              padding: "1rem",
              backgroundColor: avatar
                ? "transparent"
                : "var(--base-white, #FFF)",
              img: {
                width: avatar ? "5rem" : "3rem",
                height: avatar ? "5rem" : "3rem",
                borderRadius: avatar ? "50%" : "0",
              },
            }}
          />
          <Stack
            direction={"row"}
            sx={{
              ">p": { fontWeight: "600" },
              height: "1.5rem",
              gap: "0.25rem",
            }}
          >
            {imageText}
          </Stack>
        </Stack>

        {children}

        <FilledButton
          disabled={fetchingData}
          loading={fetchingData}
          type="submit"
          text="Continue"
          sx={{ marginTop: "2.5rem", marginBottom: "1.9rem" }}
        />

        {TEAM_MEMBERS_PERSONAL_DETAILS ? null : (
          <MobileStepper
            backButton={null}
            nextButton={null}
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            sx={{
              marginBottom: "1.9rem",
              background: "transparent",
              ".MuiMobileStepper-dotActive": {
                bgcolor: "var(--color-text-text, #344054)",
              },
            }}
          />
        )}
      </Stack>

      <ImageCropperDialog
        openChangeImage={openChangeImage}
        setOpenChangeImage={setOpenChangeImage}
        setAvatar={setAvatar}
        tempAvatar={tempAvatar}
        circularStencil={circularStencil}
      />
    </>
  );
};

export default OnboardingContainer;
