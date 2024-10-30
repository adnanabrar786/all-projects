import { Skeleton, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextMd from "components/common/Text/TextMd";
import { EClientAssessmentStatus } from "enums/assessment";
import { IClientProposal } from "interfaces/proposal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { COMPLETED } = EClientAssessmentStatus;

interface Props {
  clientProposals: IClientProposal | null;
}
const Header = ({ clientProposals }: Props) => {
  const pathname = usePathname();

  const isAssessmentComplete =
    clientProposals &&
    clientProposals?.assessment_completed &&
    clientProposals.accounts_count > 0;

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <TextMd
          text={"Proposal History"}
          sx={{
            fontWeight: "700",
            lineHeight: "1.75rem",
          }}
        />

        {clientProposals ? (
          <Link href={isAssessmentComplete ? `${pathname}/new` : pathname}>
            <FilledButton
              secondary={!isAssessmentComplete}
              disabled={!isAssessmentComplete}
              text="Create proposal"
            />
          </Link>
        ) : (
          <Skeleton
            sx={{
              width: "7.318rem",
              height: "1.25rem",
              padding: "0.625rem",
              transform: "none",
            }}
          />
        )}
      </Stack>
    </>
  );
};

export default Header;
