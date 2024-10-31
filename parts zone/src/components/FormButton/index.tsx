import { Button, SxProps } from "@mui/material";

interface Props {
  name: string;
  type: "button" | "submit" | "reset";
  sx?: SxProps;
  onClick?: () => void;
}

const FormButton = ({ name, type, sx, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      sx={{
        textTransform: "none",
        cursor: "pointer",
        backgroundColor: "var(--dark-blue)",
        padding: "20px 30px",
        color: "var( --white)",
        ":hover": {
          backgroundColor: "#155932",
        },
        fontSize: "20px",
        fontStyle: "normal",
        lineHeight: "normal",
        fontWeight: "400",
        borderRadius: "8px",
        ...sx,
      }}
    >
      {name}
    </Button>
  );
};

export default FormButton;
