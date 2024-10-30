import TextButton from "components/common/Button/TextButton";
import TextLg from "components/common/Text/TextLg";
import { CLIENTS_PROPOSALS } from "constants/pages.routes";
import { EProposalValues } from "enums/enums";
import { EProposalProfiles } from "enums/proposal";
import Link from "next/link";
import { useParams } from "next/navigation";

const BackToProposals = () => {
  const { id } = useParams();
  return (
    <>
      <Link
        href={`${CLIENTS_PROPOSALS}/${id}/${EProposalProfiles.VALUES_PROFILE_LINK}?type=${EProposalValues.EMBRACE}`}
      >
        <TextButton text="Back to Proposals" sx={{ color: "var(--primary)" }} />
      </Link>

      <TextLg
        text="Portfolio Name"
        sx={{
          fontSize: "3rem",
          fontWeight: "500",
          letterSpacing: "-0.06rem",
          lineHeight: "3.75rem",
        }}
      />
    </>
  );
};

export default BackToProposals;
