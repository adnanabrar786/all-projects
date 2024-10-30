import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import profileImg from "../imgs/profile2.png";

type Prop = {
  onClick?: () => void;
};
export default function UploadButton({ onClick }: Prop) {
  const userData = useSelector((state: RootState) => state.user);
  const { uploadImage } = useAppSelector((state: RootState) => state.userImage);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "grey",
          position: "relative",
          img: {
            borderRadius: "50%",
          },
        }}
      >
        <Image
          src={uploadImage || userData?.image || profileImg.src}
          alt="img"
          fill
          priority
        />

        <Box
          onClick={onClick}
          sx={{
            cursor: "pointer",
            position: "absolute",
            bottom: "3px",
            right: "0px",
            backgroundColor: "#2D969B",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "4px",
            paddingTop: "1px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.8667 5.9487L10.0333 3.1487L10.9667 2.21536C11.2222 1.95981 11.5362 1.83203 11.9087 1.83203C12.2811 1.83203 12.5949 1.95981 12.85 2.21536L13.7833 3.1487C14.0389 3.40425 14.1722 3.7127 14.1833 4.07403C14.1944 4.43536 14.0722 4.74359 13.8167 4.9987L12.8667 5.9487ZM11.9 6.93203L4.83333 13.9987H2V11.1654L9.06667 4.0987L11.9 6.93203Z"
              fill="white"
            />
          </svg>
        </Box>
      </Box>

      <Typography
        sx={{ fontSize: "20px", fontWeight: "700", color: "var(--textWhite)" }}
      >
        {userData.given_name} {userData.family_name}
      </Typography>
    </Box>
  );
}
