import { Box, Grid, Stack } from "@mui/material";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import { HintIcon } from "constants/images.routes";
import { useFormik } from "formik";
import { IPlansAndBillings } from "interfaces/common";
import Image from "next/image";
import { handleFormikChange } from "utils/formik";
import { PLAN_AND_BILLING_FORM_SCHEMA } from "validators/onboarding";

interface Props {
  setIsUpdatePaymentMethod: (isUpdatePaymentMethod: boolean) => void;
}

const BillingInformation = ({ setIsUpdatePaymentMethod }: Props) => {
  const handleClick = async () => {};

  const formik = useFormik<IPlansAndBillings>({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
      postalCode: "",
    },
    validationSchema: PLAN_AND_BILLING_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  const textFields = [
    {
      name: "cardNumber",
      value: formik.values.cardNumber,
      label: "Card Number",
      placeholder: "Enter your card number",
      column: 5,

      error: Boolean(formik.touched.cardNumber && formik.errors.cardNumber),
      helperText: formik.touched.cardNumber ? formik.errors.cardNumber : "",
    },
    {
      name: "expiryDate",
      value: formik.values.expiryDate,
      label: "Expiry date",
      placeholder: "MM/YYYY",
      column: 5,

      error: Boolean(formik.touched.expiryDate && formik.errors.expiryDate),
      helperText: formik.touched.expiryDate ? formik.errors.expiryDate : "",
    },
    {
      name: "cvv",
      value: formik.values.cvv,
      label: "CVV",
      placeholder: "XXX",
      column: 2,
      endIcon: true,

      error: Boolean(formik.touched.cvv && formik.errors.cvv),
      helperText: formik.touched.cvv ? formik.errors.cvv : "",
    },
    {
      name: "billingAddress",
      value: formik.values.billingAddress,
      label: "Billing address",
      placeholder: "Type your billing address",
      column: 5,

      error: Boolean(
        formik.touched.billingAddress && formik.errors.billingAddress
      ),
      helperText: formik.touched.billingAddress
        ? formik.errors.billingAddress
        : "",
    },
    {
      name: "postalCode",
      value: formik.values.postalCode,
      label: "Postal Code",
      placeholder: "Enter your postal code",
      column: 5,
      endIcon: true,

      error: Boolean(formik.touched.postalCode && formik.errors.postalCode),
      helperText: formik.touched.postalCode ? formik.errors.postalCode : "",
    },
  ];

  return (
    <Stack
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ marginTop: "2.13rem" }}
    >
      <Grid container spacing={4}>
        {textFields.map((textField) => (
          <Grid md={textField.column} item key={textField.name}>
            <LabelTopTextField
              error={textField.error}
              helperText={textField.helperText}
              onChange={(e) => {
                handleFormikChange(e.target.value, formik, textField.name);
              }}
              name={textField.name}
              label={textField.label}
              placeholder={textField.placeholder}
              value={textField.value}
              endIcon={
                textField.endIcon ? (
                  <Box sx={{ cursor: "pointer" }}>
                    <Image
                      className="notificationIcon"
                      priority
                      src={HintIcon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  </Box>
                ) : undefined
              }
            />
          </Grid>
        ))}
      </Grid>
      <SaveAndCancelButton
        sx={{ marginTop: "2.19rem" }}
        save="Update payment method"
        type="submit"
        onClickCancel={() => setIsUpdatePaymentMethod(false)}
      />
    </Stack>
  );
};

export default BillingInformation;
