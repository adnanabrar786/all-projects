import EditIcon2 from "@/assets/icons/EditIcon2.svg";
import img from "@/assets/icons/profile.png";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AddImageModal from "../UploadImage";

export default function ProfileTop() {
  const [name, setName] = useState("");
  const [isOpen, setOpen] = useState(false);
  const onSubmitUpload = async (file: File) => {};

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            width: { xs: "5.688rem", sm: "10.25rem" },
            height: { xs: "5.688rem", sm: "10.25rem" },
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image src={img} alt={"img"} objectFit="cover" layout="fill" />
        </Box>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            bottom: 15,
            right: 0,

            backgroundColor: "#2D969B", // Background color of the icon
            "&:hover": {
              backgroundColor: "#2D969B", // Change background color on hover if needed
            },
          }}
        >
          <AddImageModal
            open={isOpen}
            // loading={loading}
            setName={setName}
            handleClose={handleClose}
            onSubmitUpload={onSubmitUpload}
          />
          <EditIcon2 />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.813rem" }}>
        <Typography
          sx={{
            fontSize: { xs: "1.375rem", sm: "1.75rem" },
            fontWeight: "700",
            color: "var(--textWhite)",
          }}
        >
          Anna Adame
        </Typography>
      </Box>
    </>
  );
}
