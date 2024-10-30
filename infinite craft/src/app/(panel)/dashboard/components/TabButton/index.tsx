import { Button } from "@mui/material";

type Prop = {
  onClick: () => void;
  icon?: JSX.Element;
  text: string;
  variant: "contained" | "text";
};
export default function TabButton({ onClick, icon, text, variant }: Prop) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        border: "2px solid #2D969B",
        fontWeight: 600,
        padding: "10px",
        // paddingBottom: { xs: "5px" },
        minWidth: "123px",

        height: "44px",
        fontStyle: "Exo",
        display: "flex",
        gap: "10px",
      }}
    >
      {icon}
      {text}
    </Button>
  );
}
