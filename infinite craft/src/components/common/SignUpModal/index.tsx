import Google from "@/assets/icons/google.svg";
import ShowIcon from "@/assets/icons/showIcon";
import { exo } from "@/components/ThemeRegistry/theme";
import { SignUp, handleGoogleSignIn } from "@/services/auth.service";
import { setIsOpen } from "@/store/slices/imageSlice";
import { Colors } from "@/utils/enums/colors";
import { USER_SCHEMA } from "@/validator/user.validator";
import {
  Box,
  CircularProgress,
  CssBaseline,
  InputAdornment,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Amplify, Auth } from "aws-amplify";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import awsExports from "../../../aws-exports";
import AppModal from "../AppModal";

Amplify.configure({ ...awsExports, ssr: true });

type Modal = {
  open: boolean;
  handleClose?: any;
  // handleClick: () => void;
};

const SignUpModal = ({ open, handleClose }: Modal) => {
  const [password, setPassword] = useState(false);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    given_name: "",
    family_name: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: USER_SCHEMA(),
    onSubmit: async (
      values: {
        email: string;
        password: string;
        given_name: string;
        family_name: string;
      },
      { resetForm },
    ) => {
      const detail = {
        username: values.email,
        password: values.password,
        attributes: {
          given_name: values.given_name,
          family_name: values.family_name,
          email: values.email,
        },
      };

      const { data, error } = await SignUp(detail);
      resetForm();
    },
  });

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignUp = async () => {
    const res = await handleGoogleSignIn();
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
            sx={{
              marginTop: "2.19rem",
              // marginBottom: "0.90rem",
              fontSize: { md: "2.938rem", xs: "2.25rem" },
              fontFamily: exo.style.fontFamily,
            }}
            component="h1"
            fontWeight="600"
          >
            Sign up
          </Typography>
          <Typography sx={{ color: Colors.BLACK_CORAL, textAlign: "center" }}>
            Note that phone verification may be required for sign up. Your
            number will only be used to verify your identity for security
            purpose.
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: "flex", gap: "1.4375rem;" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="family_name"
                  label="First Name"
                  name="family_name"
                  value={formik.values.family_name}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.family_name && formik.errors.family_name,
                  )}
                  sx={{
                    fieldset: {
                      borderRadius: "0.5625rem",
                    },
                  }}
                />
                <Box>
                  {formik.errors.family_name &&
                    formik.touched.family_name &&
                    formik.errors.family_name}
                </Box>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="given_name"
                  label="Last Name"
                  name="given_name"
                  value={formik.values.given_name}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.given_name && formik.errors.given_name,
                  )}
                  sx={{
                    fieldset: {
                      borderRadius: "0.5625rem",
                    },
                  }}
                />
                <Box>
                  {formik.errors.given_name &&
                    formik.touched.given_name &&
                    formik.errors.given_name}
                </Box>
              </Box>
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              // onChange={(e) => setEmail(e.target.value)}
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
              sx={{
                fieldset: {
                  borderRadius: "0.5625rem",
                },
              }}
            />

            {formik.errors.email && formik.touched.email && formik.errors.email}

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Create Password"
              value={formik.values.password}
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
            />
            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}

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
                  // padding: "0.9rem 1.3rem 0.9rem 1.3rem",
                  marginTop: "1.3rem",
                  width: "100%",
                  borderRadius: "0.5625rem",
                  height: "3.7rem",
                  backgroundColor: Colors.ZOMP,
                  fontSize: { md: "1.375rem", xs: "1rem" },
                }}
              >
                Sign Up
              </Button>
            )}

            <Typography
              sx={{
                color: "black",
                textAlign: "center",
                marginTop: "1.35rem",
                fontSize: "0.9rem",

                fontStyle: "normal",
              }}
            >
              Already have an account?
              <span
                style={{ color: Colors.ZOMP, cursor: "pointer" }}
                onClick={() => dispatch(setIsOpen("login"))}
              >
                Login
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
                  width: "40%",
                  borderTop: `0.06rem solid ${Colors.PHILIPPINE_SILVER}`,
                }}
              ></div>
              <Typography sx={{ fontSize: { md: "1.375rem", xs: "1rem" } }}>
                Or
              </Typography>
              <div
                style={{
                  width: "40%",
                  borderTop: `0.06rem solid ${Colors.PHILIPPINE_SILVER}`,
                }}
              ></div>
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
              onClick={googleSignUp}
            >
              <Google style={{ flexShrink: 0 }} />
              <span
                style={{ marginLeft: "0.6rem", color: Colors.SONIC_SILVER }}
              >
                Login with Google
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </AppModal>
  );
};
export default SignUpModal;
