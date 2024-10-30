import Google from "@/assets/icons/google.svg";
import ShowIcon from "@/assets/icons/showIcon";
import { SignIn, handleGoogleSignIn } from "@/services/auth.service";
import { GetUserProfile } from "@/services/user.service";
import { setUserDetails } from "@/store/slices/authSlice";
import { setIsOpen } from "@/store/slices/imageSlice";
import { errorMessage, successMessage } from "@/utils/enums";
import { Colors } from "@/utils/enums/colors";
import { USER_SCHEMA_SIGNIN } from "@/validator/user.validator";
import {
  Box,
  CircularProgress,
  CssBaseline,
  InputAdornment,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Amplify } from "aws-amplify";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import awsExports from "../../../aws-exports";
import AppModal from "../AppModal";
Amplify.configure({ ...awsExports, ssr: true });

type Modal = {
  open: boolean;
  handleClose?: any;
  handleClick: () => void;
};

const SignInModal = ({ open, handleClose, handleClick }: Modal) => {
  const [password, setPassword] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: USER_SCHEMA_SIGNIN(),
    onSubmit: async (values) => {
      const { data, error } = await SignIn(values.email, values.password);

      const { data: userData }: any = await GetUserProfile(
        data.signInUserSession.accessToken.jwtToken,
      );

      if (data) {
        dispatch(
          setUserDetails({
            id: data.attributes.sub,
            email: data.attributes.email,
            given_name: userData?.data?.first_name,
            family_name: userData?.data?.last_name,
            key: null,
            isLogin: true,
            token: data.signInUserSession.accessToken.jwtToken,
            image: userData?.data?.user_image,
            subscription: userData?.data?.user_subscription_type,
            user_count: userData?.data?.user_count,
          }),
        );
        handleClose();
        successMessage("Login successfully");
      } else {
        errorMessage(error.message);
      }
    },
  });

  const googleSignIn = async () => {
    await handleGoogleSignIn();
  };

  return (
    <AppModal open={open} onClose={handleClose}>
      <Box
        component="main"
        maxWidth="xs"
        sx={{ paddingBottom: "3rem", paddingX: { md: "2.69rem", xs: "1rem" } }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            fontWeight="bold"
            sx={{
              marginTop: "2.3rem",
              fontSize: { md: "2.938rem", xs: "2.25rem" },
            }}
          >
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              value={formik.values.email}
              fullWidth
              id="email"
              onChange={formik.handleChange}
              label="Email Address"
              name="email"
              sx={{
                fieldset: {
                  borderRadius: "0.5625rem",
                },
              }}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            <TextField
              margin="normal"
              required
              value={formik.values.password}
              fullWidth
              name="password"
              label="Password"
              onChange={formik.handleChange}
              type={!password ? "password" : "text"}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* {endIcon}  */}
                    <ShowIcon onClick={() => setPassword(!password)} />
                  </InputAdornment>
                ),
              }}
              sx={{
                fieldset: {
                  borderRadius: "0.5625rem",
                },
              }}
              error={Boolean(formik.touched.password && formik.errors.password)}
            />

            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}

            <Typography
              sx={{
                alignSelf: "flex-end",
                color: "black",
                textAlign: "end",
                fontSize: "0.875rem",
                marginBottom: "2.12rem",
                fontStyle: "normal",
              }}
            >
              <span style={{ color: Colors.ZOMP, cursor: "pointer" }}>
                Forgot password?
              </span>
            </Typography>

            {formik.isSubmitting ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  padding: "0.9rem 1.3rem 0.875rem 1.3rem",
                  width: "100%",
                  height: "3.7rem",
                  fontSize: { md: "1.375rem", xs: "1rem" },
                  backgroundColor: Colors.ZOMP,
                  borderRadius: "0.5625rem",
                }}
              >
                Login
              </Button>
            )}
            <Typography
              sx={{
                color: Colors.SONIC_SILVER,
                textAlign: "center",
                marginTop: "1.2rem",
                fontSize: "0.9rem",

                fontStyle: "normal",
              }}
            >
              Don’t have an account?
              <span
                style={{ color: Colors.ZOMP, cursor: "pointer" }}
                onClick={() => dispatch(setIsOpen("signup"))}
              >
                {" "}
                Sign Up
              </span>
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.3rem",
                marginTop: "0.6rem",
              }}
            >
              <div
                style={{
                  width: "35%",
                  borderTop: `0.06rem solid ${Colors.PHILIPPINE_SILVER}`,
                }}
              ></div>
              <Typography sx={{ fontSize: { md: "1.375rem", xs: "1rem" } }}>
                Or
              </Typography>
              <div
                style={{
                  width: "35%",
                  borderTop: `0.06rem solid ${Colors.PHILIPPINE_SILVER}`,
                }}
              ></div>
            </Box>
          </form>
        </Box>

        <Button
          variant="contained"
          sx={{
            marginTop: { md: "2.94rem", xs: "2rem" },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            height: "4.2rem",
            color: "black",
            boxShadow: "none",
            backgroundColor: "white",
            borderRadius: " 0.5625rem",
            border: `0.06rem solid ${Colors.SPANISH_GRAY}`,
            ":hover": { backgroundColor: Colors.WHITE, boxShadow: "none" },
            fontSize: { xs: "0.8rem", md: "1.2rem" },
          }}
          onClick={googleSignIn}
        >
          <Google style={{ flexShrink: 0 }} />
          <span style={{ marginLeft: "0.6rem", color: Colors.SONIC_SILVER }}>
            Login with Google
          </span>
        </Button>
      </Box>
    </AppModal>
  );
};
export default SignInModal;
