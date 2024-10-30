import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ValuesResultRow from "components/ui/clients/ClientDetails/Assessments/ValuesResultRow";

interface Props {
  isLoading: boolean;
  viewResult: any;
}

const ValuesResult = ({ isLoading, viewResult }: Props) => {
  return (
    !isLoading &&
    viewResult &&
    viewResult.length && (
      <Stack
        sx={{
          border: "1px solid var(--gray-300)",
          borderRadius: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
          mt: "1.5rem",
          paddingX: "1rem",
        }}
      >
        <TableContainer sx={{ overflow: "visible" }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  width: "100%",
                  ".MuiTableCell-root": {
                    color: "var(--text-primary)",
                    borderWidth: "1px",
                    borderColor: "var(--gray-200)",
                    fontSize: "0.8125rem",
                    lineHeight: "1.25rem",
                    fontStyle: "normal",
                  },
                }}
              >
                <TableCell>Ranking</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Preference</TableCell>
                <TableCell>Importance</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {viewResult.map((result, index) => (
                <ValuesResultRow
                  key={index}
                  result={result}
                  resultLength={viewResult.length}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    )
  );
};

export default ValuesResult;
