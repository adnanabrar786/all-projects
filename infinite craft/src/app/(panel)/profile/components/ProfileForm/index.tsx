"use client";
import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import ProfileInputs from "../ProfileInputs";
import UploadButton from "../UploadButton";
import AddImageModal from "../UploadImage";

type Prop = {
  isLoading: boolean;
};

export default function ProfileForm({ isLoading }: Prop) {
  const [name, setName] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmitUpload = async (file: File) => {};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!isLoading ? (
        <Box sx={{ paddingLeft: { xs: "1.3rem", md: "3.438rem" } }}>
          <UploadButton onClick={() => setOpen(true)} />
          <Box
            sx={{
              width: "100%",
              height: { xs: "auto", md: "19rem" },
              paddingTop: { xs: "1.375rem", md: "0" },
              paddingBottom: { xs: "1.3rem", md: "0" },
              borderRadius: "0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "3.25rem",

              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <ProfileInputs />
            <AddImageModal
              open={isOpen}
              loading={loading}
              setName={setName}
              handleClose={handleClose}
              onSubmitUpload={onSubmitUpload}
            />
          </Box>
        </Box>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "0.3rem",
            height: "100%",
            width: "100%",
          }}
        />
      )}
    </>
  );
}
