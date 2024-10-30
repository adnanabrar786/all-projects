import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ICustomTable } from "interfaces/common";
import { ReactNode } from "react";

interface Props {
  headItems: ICustomTable[];
  children: ReactNode;
  sxTableContainer?: SxProps;
  sxTableHeadCell?: SxProps;
}

const CustomTableContainer = ({
  headItems,
  children,
  sxTableContainer,
  sxTableHeadCell,
}: Props) => {
  return (
    <TableContainer sx={{ overflow: "visible", ...sxTableContainer }}>
      <Table>
        <TableHead>
          <TableRow
            //@ts-ignore
            sx={{
              ".MuiTableCell-root": {
                color: "var(--black)",
                borderWidth: "2px",
                borderColor: "var(--text-primary)",
                fontWeight: "700",
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
                ...sxTableHeadCell,
              },
            }}
          >
            {headItems.map((headItem, index) => (
              <TableCell
                sx={{ width: headItem.width }}
                key={index}
                colSpan={headItem.colSpan}
              >
                {headItem.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTableContainer;
