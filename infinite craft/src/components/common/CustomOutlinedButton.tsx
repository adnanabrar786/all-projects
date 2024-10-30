import { Colors } from "@/utils/enums/colors";
import { Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const CustomOutlinedButton = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        width: "9rem",
        height: "3rem",
        fontSize: "1rem",
        borderRadius: "0.4375rem",
        border: `0.13rem solid ${Colors.ZOMP}`,
        fontWeight: "600",
        ":hover": {
          border: `0.13rem solid ${Colors.ZOMP}`,
        },
      }}
    >
      Login
    </Button>
  );
};

export default CustomOutlinedButton;
