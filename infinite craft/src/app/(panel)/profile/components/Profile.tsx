"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import ProfileForm from "./ProfileForm";
import ChangePasswordIcon from "./icons/changePassword";
import PersonalIcon from "./icons/personal";

const Profile = () => {
  const [component, setComponent] = useState("Personal Info");

  return (
    <Box
      sx={{
        position: "relative",
        marginLeft: "1.56rem",
        marginRight: "1.56rem",
        paddingTop: "1.56rem",
      }}
    >
      <Box
        sx={{
          display: { lg: "flex", xs: "none" },
          backgroundColor: "var(--backgroundsidebar)",
          width: "100%",
          color: "var(--textWhite)",
          flexDirection: "column",
          marginBottom: "1rem",
          boxShadow: "0px 30px 40px 20px var(--boxshadowcolor)",
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: "60px",
          height: "55px",
          marginBottom: "1rem",
        }}
      >
        <Box
          sx={{
            top: { lg: "2.694rem", xs: "43px" },

            border: "1px solid #f0f2f6",
            position: "absolute",
            width: "100%",
            left: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            zIndex: "1",
            gap: "60px",
            height: "55px",
            marginBottom: "1rem",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              marginLeft: "30px",
              display: "flex",
              gap: "15px",
              height: "45px",
              borderBottom:
                component === "Personal Info"
                  ? "3px solid #2D969B"
                  : "2px solid transparent",
            }}
            onClick={() => {
              setComponent("Personal Info");
            }}
          >
            <PersonalIcon
              color={
                component === "Personal Info" ? "#2D969B" : "var(--textWhite)"
              }
            />
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "16px" },
                fontWeight: "600",
                color:
                  component === "Personal Info"
                    ? "#2D969B"
                    : "var(--textWhite)",
              }}
            >
              Personal Info
            </Typography>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              gap: "15px",
              borderWidth: "100rem",
              height: "45px",
              borderBottom:
                component === "Change Password"
                  ? "3px solid #2D969B"
                  : "2px solid transparent",
            }}
            onClick={() => {
              setComponent("Change Password");
            }}
          >
            <ChangePasswordIcon
              color={
                component === "Change Password" ? "#2D969B" : "var(--textWhite)"
              }
            />
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "16px" },
                fontWeight: "600",
                color:
                  component === "Change Password"
                    ? "#2D969B"
                    : "var(--textWhite)",
              }}
            >
              Change Password
            </Typography>
          </Box>
        </Box>
      </Box>
      {component === "Personal Info" ? (
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              color: "var(--textWhite)",
              paddingLeft: { xs: "1.3rem", md: "3.438rem" },
            }}
          >
            Edit Profile
          </Typography>
          <ProfileForm isLoading={false} />
        </Box>
      ) : (
        <ChangePassword />
      )}
    </Box>
  );
};

export default Profile;
