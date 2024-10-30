"use client";
import { premiumUser } from "@/services/user.service";
import { RootState } from "@/store";
import { infoMessage } from "@/utils/enums";
import { Button, SxProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  text: string;
  width?: string;
  height?: string;
  sx?: SxProps;
  pricing?: boolean;
}

const CustomContainedButton = ({ text, width, height, sx, pricing }: Props) => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

  const premium: string = user?.subscription;

  const handleClick = async () => {
    const { data } = await premiumUser(token);
    if (data) {
      router.push(data.url);
    }
  };

  return (
    <Button
      onClick={() => {
        if (text === "Try Premium") {
          if (token) {
            if (user.subscription === "PREMIUM") {
              router.push(`/dashboard`);
            } else {
              handleClick();
            }
          } else {
            infoMessage("Login first to buy premium");
          }
        }
        if (text === "Try For Free") {
          if (token) {
            router.push(`/dashboard`);
          } else {
            infoMessage("Please Login first");
          }
        }

        if (text === "Generate") {
          if (token) {
            router.push(`/dashboard`);
          } else {
            infoMessage("Please Login First");
          }
        }
      }}
      variant="contained"
      sx={{
        width: width,
        height: height,
        borderRadius: "0.4375rem",
        fontWeight: "600",
        boxShadow: "none",
        fontSize: "1rem",
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default CustomContainedButton;
