import { Box, TableCell, TableRow } from "@mui/material";
import { DotsVerticalIcon } from "constants/images.routes";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  link: string;
  endIcon?: boolean;
  showEndIcon?: boolean;
  setShowEndIcon?: (showEndIcon: boolean) => void;
  children: ReactNode;
}

const CustomTableRow = ({
  endIcon,
  link,
  showEndIcon,
  setShowEndIcon,
  children,
}: Props) => {
  return (
    <TableRow
      onMouseEnter={() => {
        if (setShowEndIcon) {
          setShowEndIcon(true);
        }
      }}
      onMouseLeave={() => {
        if (setShowEndIcon) {
          setShowEndIcon(false);
        }
      }}
    >
      {children}
      {endIcon && (
        <TableCell onClick={(e) => e.preventDefault()} sx={{ width: "2rem" }}>
          {showEndIcon ? (
            <Box sx={{ position: "relative", width: "1rem", height: "1rem" }}>
              <Image priority src={DotsVerticalIcon} alt={"icon"} fill />
            </Box>
          ) : (
            ""
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
