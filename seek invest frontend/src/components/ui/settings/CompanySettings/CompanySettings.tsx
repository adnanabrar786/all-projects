import { CircularProgress, Grid, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CustomDivider from "components/common/Divider/CustomDivider";
import HintText from "components/common/HintText";
import LabelTopPhoneNumber from "components/common/Input/LabelTopPhoneNumber";
import LabelTopTextField, {
  ITextField,
} from "components/common/Input/LabelTopTextField";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import PersonalCompanyTitleImage from "components/ui/settings/PersonalCompanyTitleImage";
import { Utils } from "enums/utils";
import { useFormik } from "formik";
import useCompanyData from "hooks/useCompanyData";
import { ICompanyFormik } from "interfaces/company";
import { useEffect, useState } from "react";
import { checkFirmAvailability, updateFirmById } from "services/firm.services";
import { useDebouncedCallback } from "use-debounce";
import { generateTextField, handleFormikChange } from "utils/formik";
import { b64toBlob } from "utils/images";

import { COMPANY_DETAILS_FORM_SCHEMA } from "validators/onboarding";

const CompanySettings = () => {
  const [isDisable, setIsDisable] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const { company, refetchCompany } = useCompanyData();
  const [avatar, setAvatar] = useState<string>("");
  const [showLoader, setShowLoader] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarFileType, setAvatarFileType] = useState<{
    type: string;
    name: string;
  } | null>(null);

  const handleShowLoader = useDebouncedCallback(() => {
    if (company?.name !== formik.values.name) {
      mutationFirmAvailability.mutate();
    } else {
      setShowLoader(false);
    }
  }, 500);

  const handleClick = async () => {
    if (avatarFile) {
      setLoadingImage(true);
    }
    formik.setSubmitting(true);
    const [response, err] = await updateFirmById(
      formik.values,
      avatarFile,
      "put"
    );

    formik.setSubmitting(false);

    if (response && response.status === 200) {
      refetchCompany();
      setAvatar("");
      if (response.data.data) {
        setIsDisable(true);
      }
    }

    setLoadingImage(false);
  };

  const initialValues = {
    name: company?.name || "",
    phone: company?.phone || "",
    address_line1: company?.address_line1 || "",
    address_line2: company?.address_line2 || "",
    city: company?.city || "",
    state: company?.state || "",
    zip: company?.zip || "",
  };

  const formik = useFormik<ICompanyFormik>({
    initialValues: initialValues,
    validationSchema: COMPANY_DETAILS_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const revertChanges = () => {
    return formik.setValues(initialValues);
  };

  const { name, address_line1, address_line2, zip, city, state, phone } =
    formik.values;

  const mutationFirmAvailability = useMutation({
    mutationFn: () => checkFirmAvailability(formik.values.name),
    onSuccess: async (data) => {
      if (typeof data === "string" && company?.name !== formik.values.name) {
        formik.setFieldError("name", data);
        setIsNameAvailable(false);
      }

      setShowLoader(false);
    },
  });

  useEffect(() => {
    setIsDisable(
      (name === company?.name &&
        address_line1 === company?.address_line1 &&
        phone === company?.phone &&
        address_line2 === company?.address_line2 &&
        (address_line1 === company?.address_line1 || address_line1 === "") &&
        (city === company?.city || city === "") &&
        (state === company?.state || state === "") &&
        (zip === company?.zip || zip === "") &&
        !avatar) ||
        !isNameAvailable ||
        showLoader
    );
  }, [formik.values, avatar, isNameAvailable, showLoader]);

  const textFields: ITextField[] = [
    {
      name: "address_line1",
      label: "Address line 1",
      placeholder: "Address line 1",
    },
    {
      name: "address_line2",
      label: "Address line 2 (Optional)",
      placeholder: "Address line 2",
    },
    {
      name: "city",
      label: "City",
      placeholder: "City",
    },
    {
      name: "state",
      label: "State",
      placeholder: "State",
    },
    {
      name: "zip",
      label: "Zip Code",
      placeholder: "Zip Code",
    },
    {
      name: "phone",
      label: "Phone Number (Optional)",
      placeholder: "Phone Number",
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

  const titleFields = [
    {
      name: "name",
      value: formik.values.name,
      placeholder: "Firm name",
      title: "Firm name",
      subTitle:
        "This could be the name of your company, team, department, etc.",

      error: Boolean(formik.touched.name && formik.errors.name),
      helperText: formik.touched.name ? formik.errors.name : "",
    },
  ];

  useEffect(() => {
    if (avatar && avatarFileType && typeof avatar === "string") {
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

  const getNameNotAvailable = (textFieldName: string) => {
    return textFieldName === "name" && !isNameAvailable;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <PersonalCompanyTitleImage
        loading={formik.isSubmitting}
        loadingImage={loadingImage}
        uploadImageText="Upload your company logo"
        imageHint={Utils.COMPANY_SETTINGS_IMAGE_HINT}
        title={"Workspace"}
        subTitle={"Logo"}
        showSaveButton={isDisable}
        setShowSaveButton={setIsDisable}
        revertChanges={revertChanges}
        avatar={avatar || company?.logo || ""}
        setAvatar={setAvatar}
        setAvatarFileType={setAvatarFileType}
      />

      {titleFields.map((titleField) => (
        <Stack key={titleField.name}>
          <Stack sx={{ alignItems: "flex-start" }}>
            <Stack sx={{ minWidth: "40rem" }}>
              <TextMd text={titleField.title} />

              <HintText
                text={titleField.subTitle}
                sx={{
                  marginTop: "0.25rem",
                }}
              />
            </Stack>

            <Stack>
              <LabelTopTextField
                label=""
                name={titleField.name}
                placeholder={titleField.placeholder}
                //@ts-ignore
                value={titleField.value}
                error={titleField.error || getNameNotAvailable(titleField.name)}
                helperText={titleField.helperText}
                endIcon={
                  showLoader && titleField.name === "name" ? (
                    <Stack>
                      <CircularProgress size={25} />
                    </Stack>
                  ) : null
                }
                onChange={(e) => {
                  if (titleField.name === "name" && e.target.value) {
                    setIsNameAvailable(true);
                    setShowLoader(true);
                    handleShowLoader();
                  }
                  handleFormikChange(e.target.value, formik, titleField.name);
                }}
                sx={{ marginTop: "1.5rem", minWidth: "18rem" }}
              />
              {getNameNotAvailable(titleField.name) && (
                <TextXs
                  text={formik.errors.name ?? ""}
                  sx={{
                    mt: "4px",
                    ml: "14px",
                    color: "var(--material-error)",
                    fontSize: "0.75rem",
                  }}
                />
              )}
            </Stack>
          </Stack>

          <CustomDivider
            sx={{
              marginTop: "2.19rem",
              marginBottom: "1.75rem",
              maxWidth: "63rem",
            }}
          />
        </Stack>
      ))}

      <TextMd text={"Company address"} />

      <Grid
        container
        spacing={4}
        sx={{ paddingTop: "2.19rem", maxWidth: "45rem" }}
      >
        {textFields.map((textField) => (
          <Grid key={textField.name} item xs={6}>
            {textField.phoneNo ? (
              <LabelTopPhoneNumber
                label={textField.label}
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
    </form>
  );
};

export default CompanySettings;
