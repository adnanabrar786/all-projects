import Input from "@/components/common/Input";
import { useAppSelector } from "@/hooks/reduxHooks";
import { UserDetails } from "@/interface/user.interface";
import { updateUserProfile } from "@/services/user.service";
import { RootState } from "@/store";
import { setUserDetails } from "@/store/slices/authSlice";
import { Colors } from "@/utils/enums/colors";
import { USER_FIRST_LAST_NAME } from "@/validator/user.validator";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileInputs() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { uploadImage } = useAppSelector((state: RootState) => state.userImage);

  const initialValues = {
    given_name: user.given_name || "",
    family_name: user.family_name || "",
  };

  const formik = useFormik<UserDetails>({
    initialValues: initialValues,
    validationSchema: USER_FIRST_LAST_NAME,
    onSubmit: async (values: { given_name: string; family_name: string }) => {
      const response = await updateUserProfile(
        values.given_name,
        values.family_name,
        user.token,
        uploadImage || user.image,
      );

      if (response) {
        dispatch(
          setUserDetails({
            ...user,
            given_name: formik.values.given_name,
            family_name: formik.values.family_name,
            image: uploadImage,
          }),
        );
      }
    },
  });

  return (
    <Box
      component="form"
      sx={{
        width: { xs: "100%", md: "70%" },
        display: "flex",
        flexDirection: "column",
        gap: "1.438rem",
        paddingRight: { xs: "1.3rem", sm: "4.375rem" },
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1.3rem",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Input
            placeholder="Last Name"
            name="given_name"
            value={formik.values.given_name}
            onChange={formik.handleChange}
            error={Boolean(
              formik.touched.given_name && formik.errors.given_name,
            )}
          />
          <Box>
            {formik.errors.given_name &&
              formik.touched.given_name &&
              formik.errors.given_name}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Input
            placeholder="First Name"
            name="family_name"
            value={formik.values.family_name}
            onChange={formik.handleChange}
            error={Boolean(
              formik.touched.family_name && formik.errors.family_name,
            )}
          />

          <Box>
            {formik.errors.family_name &&
              formik.touched.family_name &&
              formik.errors.family_name}
          </Box>
        </Box>
      </Box>

      <Input
        placeholder={user.email}
        disabled
        backgroundColor="var(--white)"
        sx={{
          input: {
            "&.Mui-disabled": {
              "-webkit-text-fill-color": "var(--textWhite)",
              opacity: "0.5",
              fontWeight: "400",
            },
          },
        }}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "1.3rem",
          marginTop: "0.9rem",
        }}
      >
        <Button
          type="submit"
          sx={{
            fontSize: "0.8rem",
            backgroundColor: Colors.ZOMP,
            color: "white",
            ":hover": { backgroundColor: Colors.ZOMP, color: Colors.WHITE },
            width: "7rem",
            height: "2.375rem",
          }}
        >
          Save
        </Button>
        <Button
          sx={{
            fontSize: "0.8rem",
            border: `0.06rem solid ${Colors.ZOMP}`,
            width: "7rem",
            height: "2.375rem",
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
