import { UserIcon } from "constants/images.routes";
import { COMPANY_DETAILS, PERSONAL_SETTINGS } from "constants/pages.routes";
import { Utils } from "enums/utils";
import useUserData from "hooks/useUserData";

import { Grid } from "@mui/material";
import UploadAndRemoveImage from "components/common/Button/UploadAndRemoveImage";
import BorderCard from "components/common/Card/BorderCard";
import HintText from "components/common/HintText";
import LabelTopPhoneNumber from "components/common/Input/LabelTopPhoneNumber";
import LabelTopTextField, {
  ITextField,
} from "components/common/Input/LabelTopTextField";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import OnboardingContainer from "components/ui/onboardings/OnboardingContainer/OnboardingContainer";
import { FormikHelpers, useFormik } from "formik";
import { IUserFormValues } from "interfaces/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { updateUser } from "services/user.services";

import { generateTextField, handleFormikChange } from "utils/formik";
import { b64toBlob, setImageNameByTime } from "utils/images";
import { PERSONAL_DETAILS_FORM_SCHEMA } from "validators/onboarding";

type THandlePersonalDetailsSubmit = {
  values: IUserFormValues;
  formik: FormikHelpers<IUserFormValues>;
};

export default function PersonalDetails() {
  const router = useRouter();
  const { user, refetchUser } = useUserData();
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [tempAvatar, setTempAvatar] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarFileType, setAvatarFileType] = useState<{
    type: string;
    name: string;
  } | null>(null);

  const handleClick = async (
    values: THandlePersonalDetailsSubmit["values"],
    formik: THandlePersonalDetailsSubmit["formik"]
  ) => {
    if (!isValidPhoneNumber(values.phone)) {
      return formik.setFieldError("phone", "Invalid phone number.");
    }

    if (user) {
      formik.setSubmitting(true);
      const [response, err] = await updateUser(
        first_name,
        last_name,
        phone,
        avatarFile,
        user.email,
        job_designation
      );

      if (err) {
        formik.setSubmitting(false);
      }

      if (response && response.status == 200) {
        await refetchUser();
        switch (response.data.data.role) {
          case "":
            localStorage.setItem("job_designation", job_designation);
            router.replace(COMPANY_DETAILS);
            return;

          default:
            return router.replace(PERSONAL_SETTINGS);
        }
      }
    }
  };

  const formik = useFormik<IUserFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      job_designation: user?.job_designation
        ? user?.job_designation
        : localStorage.getItem("job_designation") ?? "",
    },
    validationSchema: PERSONAL_DETAILS_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const { first_name, last_name, phone, job_designation } = formik.values;

  const textFields: ITextField[] = [
    {
      name: "first_name",
      label: "First name",
      placeholder: "First name",
    },
    { name: "last_name", label: "Last name", placeholder: "Last name" },
    {
      name: "phone",
      label: "Phone number",
      placeholder: "Phone number",
    },
    {
      name: "job_designation",
      label: "Job Title",
      placeholder: "Job Title",
    },
  ].map((field) =>
    generateTextField({
      name: field.name,
      value: field.name ? formik.values[field.name] : "",
      error: field.name ? formik.errors[field.name] : "",
      helperText: field.name ? formik.touched[field.name] : "",
      label: field.label || "",
      placeholder: field.placeholder || "",
    })
  );

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

  useEffect(() => {
    if (avatar && typeof avatar === "string" && avatarFileType) {
      const base64Data = avatar.split(",")[1];
      const blob = b64toBlob(base64Data, "image/png");

      const file = new File([blob], avatarFileType.name, {
        type: avatarFileType.type,
      });
      setAvatarFile(file);
    } else {
      setAvatarFile(null);
    }

    return () => {
      if (avatar && typeof avatar === "string") {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  return (
    <OnboardingContainer
      fetchingData={formik.isSubmitting}
      activeStep={0}
      avatar={avatar || user?.profile}
      title={"Tell us about yourself"}
      desc={
        "SeekInvest is the platform for growth and engagement, designed for forward-thinking enterprises and financial advisors."
      }
      imageIcon={UserIcon}
      imageText={
        <>
          <TextSm text={formik.values.first_name} />
          <TextSm text={formik.values.last_name} />
        </>
      }
      openChangeImage={openChangeImage}
      setOpenChangeImage={setOpenChangeImage}
      setAvatar={setAvatar}
      tempAvatar={tempAvatar}
      onClickContinue={formik.handleSubmit}
      circularStencil
    >
      <BorderCard sx={{ maxWidth: "36.3125rem", marginTop: "2.5rem" }}>
        <TextXl
          text="Personal details"
          sx={{ fontSize: "1.25rem", marginBottom: "2.56rem" }}
        />

        <Grid container spacing={4}>
          {textFields.map((textField, index) => (
            <Grid xs={6} item key={index}>
              {textField.phoneNo ? (
                <LabelTopPhoneNumber
                  phoneNo={textField.value}
                  error={textField.error}
                  helperText={textField.helperText}
                  onChange={(e) => {
                    handleFormikChange(e, formik, textField.name);
                  }}
                />
              ) : (
                <LabelTopTextField
                  value={textField.value}
                  error={textField.error}
                  helperText={textField.helperText}
                  name={textField.name}
                  label={textField.label}
                  placeholder={textField.placeholder}
                  onChange={(e) => {
                    handleFormikChange(e.target.value, formik, textField.name);
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <UploadAndRemoveImage
          loading={avatarFile ? formik.isSubmitting : false}
          text={"Upload a profile image"}
          avatar={avatar}
          setAvatar={setAvatar}
          onChange={onLoadImage}
        />

        <HintText
          text={Utils.UPLOAD_IMAGE_HINT}
          sx={{ fontWeight: "500", marginTop: "0.75rem" }}
        />
      </BorderCard>
    </OnboardingContainer>
  );
}
