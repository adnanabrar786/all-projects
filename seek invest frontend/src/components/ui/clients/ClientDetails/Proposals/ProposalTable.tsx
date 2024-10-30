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
import { IClientProposal } from "interfaces/proposal";
import { useParams } from "next/navigation";
import ProposalRow from "./ProposalRow";

interface Props {
  clientProposals: IClientProposal | null;
}

const ProposalTable = ({ clientProposals }: Props) => {
  const { clientId }: { clientId: string } = useParams();

  const proposals = clientProposals ? clientProposals.proposals : [];

  return (
    <>
      <Stack
        sx={{
          border: "1px solid var(--gray-200)",
          borderRadius: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "9.1875rem",
          mt: "1.5rem",
          width: "100%",
        }}
      >
        {clientProposals ? (
          <>
            {proposals.length ? (
              <TableContainer
                sx={{
                  overflow: "visible",
                  boxSizing: "border-box",
                }}
              >
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow
                      sx={{
                        width: "100%",
                        ".MuiTableCell-root": {
                          borderRadius: "0.5rem 0.5rem 0 0",
                          color: "var(--text-secondary)",
                          borderWidth: "1px",
                          borderColor: "var(--gray-200)",
                          fontSize: "0.75rem",
                          lineHeight: "1.25rem",
                          fontStyle: "normal",
                          backgroundColor: "var(--ghost-white)",
                        },
                      }}
                    >
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Date Created
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Date Updated
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {proposals.map((proposal, index) => (
                      <ProposalRow
                        key={index}
                        proposal={proposal}
                        totalProposals={proposals.length - 1}
                        index={index}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TextXs
                text="After your client completes the assessments, generate a proposal to assess alignment"
                sx={{
                  color: "var(--text-secondary)",
                  maxWidth: "19.35363rem",
                  textAlign: "center",
                }}
              />
            )}
          </>
        ) : (
          <Stack sx={{ gap: "1rem", width: "100%", alignItems: "center" }}>
            <Skeleton width={"60%"} />
            <Skeleton width={"40%"} />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default ProposalTable;
