import { createContactForm } from "@/services/contact-us.service";
import { toastError, toastSuccess } from "@/utils/toaster";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { isValidPhoneNumber } from "react-phone-number-input";
import { contactFormSchema } from "../config/validation";
import { default as CustomInputlabel } from "../CustomInputlabel";
import { default as CustomTextField } from "../CustomTextField";
import FormButton from "../FormButton";
import CountryDropDown from "../style/CountryDropDown";
import LabelTopPhoneNumber from "../style/LabelTopPhoneNumber";
import Underline from "../Underline";

const ContactForm = () => {
  const mutation = useMutation({
    mutationFn: () => {
      const {
        first_name,
        last_name,
        phone_no,
        email,
        country,
        message,
        company_name,
      } = formik.values;
      return createContactForm({
        first_name,
        last_name,
        phone_no,
        email,
        country,
        message,
        company_name,
      });
    },
    onSuccess: async ({ data, status }) => {
      if (!data.hasError) {
        toastSuccess("Form submitted successfully");
        formik.resetForm();
      }
    },
    onError: (e: any) => {
      toastError("Form not submitted, try again!");
    },
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_no: "",
      company_name: "",
      email: "",
      country: "none",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: (values) => {
      if (
        !isValidPhoneNumber(formik.values.phone_no) &&
        formik.values.phone_no
      ) {
        return formik.setFieldError("phone_no", "Invalid phone number.");
      } else if (isValidPhoneNumber(formik.values.phone_no)) {
        mutation.mutate();
      }
    },
  });
  return (
    <Stack
      sx={{
        maxWidth: { md: "772px", xs: "100%" },
        width: { md: "772px", xs: "100%" },
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          display: "flex",
          alignItems: { md: "flex-start", xs: "center" },
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            color: "var(--text-heading)",
            fontSize: { sm: "40px", xs: "30px" },
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          Contact Us
        </Typography>

        <Underline sx={{ marginTop: "0px" }} />

        <Typography
          sx={{
            maxWidth: { md: "634px", xs: "100%" },
            color: "var( --text-grey)",
            fontSize: { sm: "16px", xs: "14px" },
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "200%",
            padding: { md: "0px", sm: "0 24px", xs: "0px" },
            textAlign: { md: "left", xs: "center" },
          }}
        >
          We'd like to hear from you! For questions, comments and suggestions
          regarding our products or services, feel free to send a message
          through the following form.
        </Typography>
      </Stack>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          marginTop: "40px",
          display: "flex",
          gap: { sm: "40px", xs: "20px" },
          flexWrap: "wrap",
          width: "100%",
          justifyContent: { md: "left", xs: "center" },
        }}
      >
        <Stack
          sx={{
            width: { lg: "45%", xs: "100%" },
            span: {
              color: "var(--red)",
            },
          }}
        >
          <CustomInputlabel name="First Name *" />
          <CustomTextField
            textType="text"
            placeHolder="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
          />
          <span>
            {formik.errors.first_name &&
              formik.touched.first_name &&
              formik.errors.first_name}
          </span>
        </Stack>
        <Stack
          sx={{
            width: { lg: "45%", xs: "100%" },
            span: {
              color: "var(--red)",
            },
          }}
        >
          <CustomInputlabel name="Last Name *" />
          <CustomTextField
            textType="text"
            placeHolder="Last Name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          />
          <span>
            {formik.errors.last_name &&
              formik.touched.last_name &&
              formik.errors.last_name}
          </span>
        </Stack>
        <Stack
          sx={{
            width: { lg: "45%", xs: "100%" },
          }}
        >
          <CustomInputlabel name="Phone Number" />
          <LabelTopPhoneNumber
            error={formik.errors.phone_no}
            helperText={formik.errors.phone_no}
            phoneNo={formik.values.phone_no}
            onChange={(e) => formik.setFieldValue("phone_no", e)}
          />
        </Stack>
        <Stack
          sx={{
            width: { lg: "45%", xs: "100%" },
          }}
        >
          <CustomInputlabel name="Company Name" />
          <CustomTextField
            textType="text"
            placeHolder="Company Name"
            name="company_name"
            value={formik.values.company_name}
            onChange={formik.handleChange}
          />
        </Stack>
        <Stack
          sx={{
            width: { lg: "45%", xs: "100%" },
            span: {
              color: "var(--red)",
            },
          }}
        >
          <CustomInputlabel name="Email ID *" />
          <CustomTextField
            textType="text"
            placeHolder="Email ID"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <span>
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </span>
        </Stack>

        <Stack
          sx={{
            width: { lg: "45%", xs: "100%" },
            gap: "0.5rem",
          }}
        >
          <CustomInputlabel name="Country" />
          <CountryDropDown formik={formik} />
        </Stack>

        <Stack
          sx={{
            width: "100%",
            paddingRight: { lg: "32px", xs: "0px" },
          }}
        >
          <CustomInputlabel name="Message *" />

          <TextField
            placeholder="Message"
            name="message"
            sx={{
              backgroundColor: "var( --text-background)",
              fontSize: "16px",
              fontWeight: "700",
              borderRadius: "8px",
              fieldset: {
                border:
                  formik.touched.message && Boolean(formik.errors.message)
                    ? "1px solid var(--red)"
                    : "none",
              },
              "& .MuiOutlinedInput-root": {
                "input::placeholder": {
                  fontSize: "16px",
                  color: "var(--light-grey)",
                  fontWeight: "700",
                },
              },
            }}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
          />
          <Stack
            sx={{
              color: "var(--red)",
            }}
          >
            {formik.errors.message &&
              formik.touched.message &&
              formik.errors.message}
          </Stack>
        </Stack>

        <Stack
          sx={{
            width: { sm: "fit-content", xs: "100%" },
            alignItems: { md: "left", xs: "center" },
            marginTop: { sm: "0px", xs: "15px" },
          }}
        >
          <FormButton
            onClick={() => {
              if (
                formik.values.phone_no &&
                !isValidPhoneNumber(formik.values.phone_no)
              ) {
                return formik.setFieldError(
                  "phone_no",
                  "Invalid phone number."
                );
              }
            }}
            sx={{
              width: { md: "fit-content", xs: "100%" },
            }}
            type="submit"
            name="Submit"
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ContactForm;
