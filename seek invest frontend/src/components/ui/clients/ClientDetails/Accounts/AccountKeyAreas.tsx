import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyAreasRow from "components/ui/clients/ClientDetails/Accounts/KeyAreasRow";
import AccountDetailsSkeleton from "components/ui/clients/ClientDetails/Accounts/Sekeleton/AccountDetailsSkeleton";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";
import { IAccountValuesAlignment } from "interfaces/client";
import { getTopicNull } from "utils/valueAlignment";

interface Props {
  accountsValueAlignment: IAccountValuesAlignment | null;
}

const AccountKeyAreas = ({ accountsValueAlignment }: Props) => {
  const keyAreas = [
    {
      title: "Top Values in Alignment (Score > 66)",
      data: accountsValueAlignment
        ? accountsValueAlignment.top_values_alignments.filter(
            (val) =>
              !getTopicNull({
                type: val.type,
                preference: val.preference,
                value: val.values_alignment.value_score,
              })
          )
        : [],
    },
    {
      title: "Key Values for Improvement (Score < 33)",
      data: accountsValueAlignment
        ? accountsValueAlignment.key_values_improvements.filter(
            (val) =>
              !getTopicNull({
                type: val.type,
                preference: val.preference,
                value: val.values_alignment.value_score,
              })
          )
        : [],
    },
  ];
  return (
    <Grid container columnSpacing={2} sx={{ mt: "2rem" }}>
      {keyAreas.map((keyArea) => (
        <Grid
          item
          xs={keyAreas[0].data.length && keyAreas[1].data.length ? 6 : 12}
          key={keyArea.title}
        >
          {keyArea.data.length > 0 ? (
            <ClientSummaryCard
              title={keyArea.title}
              sx={{ padding: "0" }}
              sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
            >
              <TableContainer sx={{ overflow: "visible" }}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow
                      sx={{
                        width: "100%",
                        bgcolor: "var(--ghost-white)",
                        ".MuiTableCell-root": {
                          color: "var(--text-primary)",
                          borderWidth: "1px",
                          borderColor: "var(--gray-200)",
                          fontSize: "0.75rem",
                          lineHeight: "1.25rem",
                          fontStyle: "normal",
                          pr: "0.5rem",
                        },
                      }}
                    >
                      <TableCell>Topic</TableCell>
                      <TableCell>Preference</TableCell>
                      <TableCell>Importance</TableCell>
                      <TableCell sx={{ textAlign: "center", width: "6rem" }}>
                        Values Alignment
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {keyArea.data.length ? (
                      keyArea.data.map((result, index) => (
                        <KeyAreasRow
                          key={index}
                          result={result}
                          resultLength={keyArea.data.length}
                          index={index}
                          keyAreasSection
                        />
                      ))
                    ) : (
                      <AccountDetailsSkeleton />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </ClientSummaryCard>
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
};

export default AccountKeyAreas;
