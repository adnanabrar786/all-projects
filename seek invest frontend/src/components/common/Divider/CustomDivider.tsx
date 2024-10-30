import { Divider, SxProps } from "@mui/material";

interface Props {
  sx?: SxProps;
}
const CustomDivider = ({ sx }: Props) => {
  return <Divider sx={{ borderColor: "var(--gray-200)", ...sx }} />;
};

export default CustomDivider;
