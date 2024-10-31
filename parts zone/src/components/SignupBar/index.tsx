import { SignUpBarImages } from "@/constant/data";
import { createSubscriberForm } from "@/services/subscribe.service";
import { toastError, toastSuccess } from "@/utils/toaster";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { subscriberFormSchema } from "../config/validation";

export default function Signupbar() {
  const mutation = useMutation({
    mutationFn: () => {
      const { email } = formik.values;
      return createSubscriberForm({ email });
    },
    onSuccess: async ({ data, status }) => {
      if (!data.hasError) {
        toastSuccess("Subscribed successfully");
        formik.resetForm({ values: formik.initialValues });
      }
      if (data.hasError) {
        toastSuccess(data.error);
        formik.resetForm({ values: formik.initialValues });
      }
    },
    onError: (e: any) => {
      toastError("Failed to subscribe, try again!");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: subscriberFormSchema,
    onSubmit: (values) => {
      mutation.mutate();
    },
  });

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { xs: "270px", md: "100px" },
          width: "100%",
          backgroundColor: "#E8E8E8",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginLeft: { md: "100px", xs: "0px" },
            marginTop: { xs: "3.5rem", md: "0rem" },
            flexDirection: { xs: "column", md: "row" },
            display: "flex",
            alignItems: "center",
            gap: { md: "1rem", xs: "30px" },
          }}
        >
          <Typography
            sx={{
              color: "#000",
              textAlign: "center",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
            }}
          >
            Signup for News Letter
          </Typography>

          <Box
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <TextField
              name="email"
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              sx={{
                ".MuiInputBase-root": {
                  backgroundColor: "#fff",
                  height: "50px",
                  borderRadius: "0px",
                },
                width: { sm: "300px", xs: "230px" },
              }}
            />

            <Button
              type="submit"
              sx={{
                width: { sm: "125px", xs: "100px" },
                flexShrink: 0,
                backgroundColor: "#155932",
                color: "#fff",
                textTransform: "capitalize !important",
                borderRadius: "0px",
                ":hover": {
                  backgroundColor: "#155932",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            marginRight: { xs: "0rem", md: "5rem" },
            marginBottom: { xs: "3rem", md: "0rem" },
            display: "flex",
            gap: "15px",
            img: {
              cursor: "pointer",
            },
          }}
        >
          {SignUpBarImages.map((image, index) => (
            <Link key={image.id} href={image.link} target="_blank">
              <Stack>
                <Image
                  priority
                  quality={100}
                  src={image.img}
                  alt="backgroundimage"
                  width={24}
                  height={24}
                />
              </Stack>
            </Link>
          ))}
        </Box>
      </Stack>
    </>
  );
}
