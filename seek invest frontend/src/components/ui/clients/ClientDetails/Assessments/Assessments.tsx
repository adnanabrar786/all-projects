import {
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import Assessment from "components/ui/clients/ClientDetails/Assessments/Assessment";
import Header from "components/ui/clients/ClientDetails/Assessments/Header";
import useClientAssessmentData from "hooks/useClientAssessmentData";

const Assessments = () => {
  const { assessments, isError } = useClientAssessmentData();

  return (
    <Stack>
      <Header />

      <Stack
        sx={{
          border: "1px solid var(--gray-300)",
          borderRadius: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "9.1875rem",
          mt: "1.5rem",
        }}
      >
        {assessments || isError ? (
          <>
            {assessments?.length && !isError ? (
              <Stack
                sx={{
                  width: "100%",
                }}
              >
                <TableContainer
                  sx={{
                    overflow: "visible",
                    paddingX: "1rem",
                    boxSizing: "border-box",
                  }}
                >
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow
                        sx={{
                          width: "100%",
                          ".MuiTableCell-root": {
                            color: "var(--text-secondary)",
                            borderWidth: "1px",
                            borderColor: "var(--gray-300)",
                            fontSize: "0.75rem",
                            lineHeight: "1.25rem",
                            fontStyle: "normal",
                          },
                        }}
                      >
                        <TableCell>Assessment</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Date Sent</TableCell>
                        <TableCell>Date Completed</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {assessments.map((assessment, index) => (
                        <Assessment
                          key={index}
                          assessment={assessment}
                          totalAssessments={assessments.length - 1}
                          index={index}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            ) : (
              <TextXs
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  textAlign: "center",
                  width: "15.875rem",
                }}
                text={
                  "Send an assessment in order to evaluate your client’s alignment"
                }
              />
            )}
          </>
        ) : (
          !isError && (
            <Stack sx={{ gap: "1rem", width: "100%", alignItems: "center" }}>
              <Skeleton width={"60%"} />
              <Skeleton width={"40%"} />
            </Stack>
          )
        )}
      </Stack>
    </Stack>
  );
};

export default Assessments;
