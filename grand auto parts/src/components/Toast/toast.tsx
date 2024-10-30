import { CrossRedIcon, TickCheckboxIcon } from "@/config/images.routes";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import toast from "react-hot-toast";

export enum toastTypes {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
}

export interface contents {
  title: string;
  description: string;
}

export interface contentTest {
  type: string;
  description: string;
}

const image: { [type in toastTypes]: string } = {
  [toastTypes.success]: TickCheckboxIcon,
  [toastTypes.error]: CrossRedIcon,
  [toastTypes.info]: TickCheckboxIcon,
  [toastTypes.warning]: TickCheckboxIcon,
};
const background: { [type in toastTypes]: string } = {
  [toastTypes.success]: "bg-success ",
  [toastTypes.error]: "bg-danger",
  [toastTypes.info]: "bg-info",
  [toastTypes.warning]: "bg-warning",
};

const Toast: React.FC<contentTest> = ({ type, description }) => (
  <>
    {toast.custom((t) => (
      <div>
        <Stack
          sx={{
            width: "fit-content",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              backgroundColor: "white",
            }}
          >
            <Image
              priority
              src={image[type]}
              alt={"icon"}
              width={20}
              height={20}
            />
            <Stack>
              <Typography
                sx={{
                  fontSize: "0.8125rem",
                  fontWeight: "500",
                  lineHeight: "1.125rem",
                }}
              >
                {description}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </div>
    ))}
  </>
);

export default Toast;
