import { useUserContext } from "context/user/UserContext";
import { Utils } from "enums/utils";

import { Box, Stack } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import LabelTopPhoneNumber from "components/common/Input/LabelTopPhoneNumber";
import LabelTopTextField, {
  ITextField,
} from "components/common/Input/LabelTopTextField";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import PersonalCompanyTitleImage from "components/ui/settings/PersonalCompanyTitleImage";
import { useFormik } from "formik";
import { IUserFormValues } from "interfaces/user";
import { useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import { updateUser } from "services/user.services";

import { generateTextField, handleFormikChange } from "utils/formik";
import { b64toBlob } from "utils/images";
import { toastSuccess } from "utils/toaster";
import { PERSONAL_SETTINGS_FORM_SCHEMA } from "validators/setting";

const PersonalSettings = () => {
  const { user, setUser } = useUserContext();

  const [emailChangeMessage, setEmailChangeMessage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [avatar, setAvatar] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarFileType, setAvatarFileType] = useState<{
    type: string;
    name: string;
  } | null>(null);

  const handleClick = async () => {
    if (avatarFile) {
      setLoadingImage(true);
    }

    if (!isValidPhoneNumber(phone)) {
      return formik.setFieldError("phone", "Invalid phone number.");
    }

    formik.setSubmitting(true);
    const [response, err] = await updateUser(
      first_name,
      last_name,
      phone,
      avatarFile,
      user?.email,
      job_designation
    );

    formik.setSubmitting(false);

    if (response && response.status == 200) {
      setIsDisable(true);

      setUser({
        ...response.data.data,
        profile: avatarFile
          ? URL.createObjectURL(avatarFile)
          : response.data.data.profile,
      });

      setAvatar("");
      toastSuccess("User updated");
    }

    setLoadingImage(false);
  };

  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    job_designation: user?.job_designation || "",
  };

  const formik = useFormik<IUserFormValues>({
    initialValues,
    validationSchema: PERSONAL_SETTINGS_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  const revertChanges = () => {
    setAvatar("");
    return formik.setValues(initialValues);
  };

  const { first_name, last_name, phone, email, job_designation } =
    formik.values;

  useEffect(() => {
    setEmailChangeMessage("");
    setIsDisable(
      first_name === user?.first_name &&
        last_name === user?.last_name &&
        phone === user?.phone &&
        job_designation === user?.job_designation &&
        email === user?.email &&
        !avatar
    );
  }, [formik.values, avatar]);

  const textFields: ITextField[] = [
    {
      name: "first_name",
      label: "First name",
      placeholder: "First name",
    },
    { name: "last_name", label: "Last name", placeholder: "Last name" },
    { name: "email", label: "Email", placeholder: "Email" },
    {
      name: "phone",
      label: "Phone number",
      placeholder: "Phone number",
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <PersonalCompanyTitleImage
          loading={formik.isSubmitting}
          loadingImage={loadingImage}
          uploadImageText="Upload a profile image"
          imageHint={Utils.PERSONAL_SETTINGS_IMAGE_HINT}
          title={"Personal Settings"}
          subTitle="Profile Picture"
          showSaveButton={isDisable}
          setShowSaveButton={setIsDisable}
          revertChanges={revertChanges}
          avatar={avatar || user?.profile || ""}
          setAvatar={setAvatar}
          setAvatarFileType={setAvatarFileType}
          circularStencil
        />

        <Stack direction={"row"} spacing={4}>
          {textFields.slice(0, 2).map((textField) => (
            <Box key={textField.name}>
              <LabelTopTextField
                value={textField.value}
                error={textField.error}
                helperText={textField.helperText}
                name={textField.name}
                label={textField.label}
                placeholder={textField.placeholder}
                sx={{ width: "20rem" }}
                onChange={(e) => {
                  handleFormikChange(e.target.value, formik, textField.name);
                }}
              />
            </Box>
          ))}
        </Stack>

        <Stack direction={"row"} spacing={4} sx={{ paddingTop: "2rem" }}>
          {textFields.slice(2, 4).map((textField) => (
            <Box key={textField.name}>
              {textField.phoneNo ? (
                <LabelTopPhoneNumber
                  phoneNo={textField.value}
                  error={textField.error}
                  helperText={textField.helperText}
                  sx={{ width: "20rem" }}
                  onChange={(e) => {
                    handleFormikChange(e, formik, textField.name);
                  }}
                />
              ) : (
                <LabelTopTextField
                  disabled={textField.name === "email"}
                  value={textField.value}
                  error={textField.error}
                  helperText={textField.helperText}
                  name={textField.name}
                  label={textField.label}
                  placeholder={textField.placeholder}
                  sx={{ width: "20rem" }}
                  onChange={(e) => {
                    handleFormikChange(e.target.value, formik, textField.name);
                  }}
                />
              )}
              {emailChangeMessage && textField.name === "email" && (
                <TextXs
                  text={emailChangeMessage}
                  sx={{ color: "#B54708", width: "20rem" }}
                />
              )}
            </Box>
          ))}
        </Stack>
      </form>

      <CustomDivider sx={{ my: "1.5rem" }} />

      <TextMd text="Job Title" sx={{ lineHeight: "1.75rem" }} />
      <TextXs
        text="This could be your job title or level in your company, team, department, etc."
        sx={{ color: "var(--text-secondary)" }}
      />

      <LabelTopTextField
        name="job_designation"
        value={formik.values.job_designation}
        error={Boolean(
          formik.touched.job_designation && formik.errors.job_designation
        )}
        helperText={
          formik.touched.job_designation && formik.errors.job_designation
            ? formik.errors.job_designation
            : ""
        }
        onChange={(e) => {
          handleFormikChange(e.target.value, formik, "job_designation");
        }}
        sx={{
          mt: "1.5rem",
          width: "20rem",
        }}
      />
    </>
  );
};

export default PersonalSettings;
