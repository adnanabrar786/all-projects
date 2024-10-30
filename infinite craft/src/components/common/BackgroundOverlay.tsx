import { Box } from "@mui/material";

interface Props {
  left?: string | number;
  right?: string | number;
}
const BackgroundOverlay = ({ left, right }: Props) => {
  return (
    <Box
      sx={{
        width: { xs: "70%", md: "38rem" },
        height: "17.065rem",
        borderRadius: "25.0625rem",
        // background: Colors.RGBA_25,  //imp to comment.
        background: "rgba(45, 150, 155, 0.34)",
        filter: "blur(90px)",
        // filter: 'blur(200px)',
        position: "absolute",
        left: left,
        right: right,
        zIndex: "-1",
      }}
    />
  );
};

export default BackgroundOverlay;
