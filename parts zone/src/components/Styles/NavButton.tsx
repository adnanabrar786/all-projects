import { Button } from "@mui/material";
import { SxProps } from "@mui/system";

interface Props {
  sx?: SxProps;
  text: string;
  onClick?: () => void;
}

const NavButton = ({ sx, text, onClick }: Props) => {
  return (
    <Button
      sx={{
        padding: { lg: "10px 30px", xs: "8px 15px" },
        borderRadius: "45px",
        color: "var(--dark-blue)",
        border: "1px solid var(--dark-blue)",
        ":hover": {
          backgroundColor: "var(--white)",
        },
        fontSize: "14px",
        fontStyle: "normal",
        lineHeight: "normal",
        fontWeight: "600",
        ...sx,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default NavButton;
