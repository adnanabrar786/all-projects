import { CircularProgress, Grid, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import UploadAndRemoveImage from "components/common/Button/UploadAndRemoveImage";
import BorderCard from "components/common/Card/BorderCard";
import HintText from "components/common/HintText";
import LabelTopPhoneNumber from "components/common/Input/LabelTopPhoneNumber";
import LabelTopTextField, {
  ITextField,
} from "components/common/Input/LabelTopTextField";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import TextXs from "components/common/Text/TextXs";
import OnboardingContainer from "components/ui/onboardings/OnboardingContainer/OnboardingContainer";
import { BuildingIcon } from "constants/images.routes";
import { PRICE_PLAN } from "constants/pages.routes";
import { Utils } from "enums/utils";
import { FormikHelpers, useFormik } from "formik";
import useCompanyData from "hooks/useCompanyData";
import useUserData from "hooks/useUserData";
import { ICompanyFormik } from "interfaces/company";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { checkFirmAvailability, updateFirmById } from "services/firm.services";
import { useDebouncedCallback } from "use-debounce";
import { generateTextField, handleFormikChange } from "utils/formik";

import { b64toBlob, setImageNameByTime } from "utils/images";
import { COMPANY_DETAILS_FORM_SCHEMA } from "validators/onboarding";

type THandleCompanyDetailsSubmit = {
  values: ICompanyFormik;
  formik: FormikHelpers<ICompanyFormik>;
};

const CompanyDetails = () => {
  const router = useRouter();
  const { company, refetchCompany } = useCompanyData();
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [tempAvatar, setTempAvatar] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const { user } = useUserData();
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

  const handleClick = async (
    values: THandleCompanyDetailsSubmit["values"],
    formik: THandleCompanyDetailsSubmit["formik"]
  ) => {
    if (!isNameAvailable) {
      return;
    }

    if (values.phone && !isValidPhoneNumber(values.phone)) {
      return formik.setFieldError("phone", "Invalid phone number.");
    }

    formik.setSubmitting(true);

    const [response, err] = await updateFirmById(values, avatarFile, "post");

    if (err) {
      formik.setSubmitting(false);
    }

    if (response && response.status === 201) {
      if (response.data && response.data.data.idToken) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.data.idToken)
        );
      }

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("job_designation");
      }
      router.replace(PRICE_PLAN);

      refetchCompany();
    }
  };

  const formik = useFormik<ICompanyFormik>({
    initialValues: {
      name: company?.name || "",
      phone: company?.phone || "",
      address_line1: company?.address_line1 || "",
      address_line2: company?.address_line2 || "",
      city: company?.city || "",
      state: company?.state || "",
      zip: company?.zip || "",
      job_designation:
        user?.job_designation ||
        (typeof localStorage !== "undefined" &&
          localStorage.getItem("job_designation")) ||
        "",
    },
    validationSchema: COMPANY_DETAILS_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const mutationFirmAvailability = useMutation({
    mutationFn: () => checkFirmAvailability(formik.values.name),
    onSuccess: async (data) => {
      if (typeof data === "string") {
        formik.setFieldError("name", data);
        setIsNameAvailable(false);
      }
      setShowLoader(false);
    },
  });

  const textFields: ITextField[] = [
    { name: "name", label: "Company name", placeholder: "Company name" },
    { name: undefined },
    {
      name: "phone",
      label: "Phone number (Optional)",
      placeholder: "Phone number",
    },
    { name: undefined },
    {
      name: "address_line1",
      label: "Company address line 1",
      placeholder: "Company address",
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
      label: "Postal Code",
      placeholder: "Postal Code",
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
    <>
      <OnboardingContainer
        fetchingData={formik.isSubmitting}
        onClickContinue={formik.handleSubmit}
        activeStep={1}
        avatar={avatar}
        title={"Create your workspace"}
        desc={
          "SeekInvest is the platform for growth and engagement, designed for forward-thinking enterprises and financial advisors."
        }
        imageIcon={BuildingIcon}
        imageText={
          <>
            <TextSm text={formik.values.name} />
          </>
        }
        openChangeImage={openChangeImage}
        setOpenChangeImage={setOpenChangeImage}
        setAvatar={setAvatar}
        tempAvatar={tempAvatar}
      >
        <BorderCard sx={{ maxWidth: "36.3125rem", marginTop: "2.5rem" }}>
          <TextXl
            text="Company details"
            sx={{ fontSize: "1.25rem", marginBottom: "2.56rem" }}
          />

          <Grid container spacing={4}>
            {textFields.map((textField, index) => (
              <Grid xs={6} item key={index}>
                {!textField.name ? (
                  <></>
                ) : textField.phoneNo ? (
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
                  <Stack>
                    <LabelTopTextField
                      type={
                        textField.name === "postal_code" ? "number" : "text"
                      }
                      value={textField.value}
                      error={
                        textField.error || getNameNotAvailable(textField.name)
                      }
                      helperText={textField.helperText}
                      onChange={(e) => {
                        if (textField.name === "name" && e.target.value) {
                          setIsNameAvailable(true);
                          setShowLoader(true);
                          handleShowLoader();
                        }
                        handleFormikChange(
                          e.target.value,
                          formik,
                          textField.name
                        );
                      }}
                      endIcon={
                        showLoader && textField.name === "name" ? (
                          <Stack>
                            <CircularProgress size={25} />
                          </Stack>
                        ) : null
                      }
                      name={textField.name}
                      label={textField.label}
                      placeholder={textField.placeholder}
                    />
                    {getNameNotAvailable(textField.name) && (
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
                )}
              </Grid>
            ))}
          </Grid>

          <UploadAndRemoveImage
            loading={avatarFile ? formik.isSubmitting : false}
            text="Upload your company logo"
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
    </>
  );
};

export default CompanyDetails;
