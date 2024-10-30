import Input from "@/components/common/Input";
import { ChangePassword } from "@/services/auth.service";
import { Colors } from "@/utils/enums/colors";
import { PASS_CHANGE_SCHEMA } from "@/validator/user.validator";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function PasswordForm() {
  const formik = useFormik<any>({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmNewPass: "",
    },
    validationSchema: PASS_CHANGE_SCHEMA,
    onSubmit: async () => {
      const { data, error } = await ChangePassword(
        formik.values.oldPass,
        formik.values.newPass,
      );
      if (data) {
        toast.success("Password Reset Successfully");
        formik.resetForm();
      }
      if (error) {
        toast.error("Incorrect Details");
      }
    },
  });

  const handleFormikChange = (e: any) => {
    const { name, value } = e.target;

    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  return (
    <Box
      onSubmit={formik.handleSubmit}
      component={"form"}
      sx={{
        width: { xs: "100%", md: "70%" },
        display: "flex",
        flexDirection: "column",
        gap: "1.438rem",
        paddingRight: { xs: "1.3rem", sm: "4.375rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1.3rem",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Input
          type="password"
          placeholder="Old Password"
          name="oldPass"
          onChange={handleFormikChange}
          error={formik.errors.oldPass && formik.touched.oldPass}
          helperText={formik.errors.oldPass}
        />
        <Input
          type="password"
          placeholder="New Password"
          name="newPass"
          onChange={handleFormikChange}
          error={formik.errors.newPass && formik.touched.newPass}
          helperText={formik.errors.newPass}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmNewPass"
          onChange={handleFormikChange}
          error={formik.errors.confirmNewPass && formik.touched.confirmNewPass}
          helperText={formik.errors.confirmNewPass}
        />
      </Box>

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
