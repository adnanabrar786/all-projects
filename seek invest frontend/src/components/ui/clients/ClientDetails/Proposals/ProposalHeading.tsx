import { Stack } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import CircleChip from "components/common/Chip/CircleChip";
import TextXs from "components/common/Text/TextXs";
import { proposalValuesProfile } from "constants/data";
import { EProposalProfiles } from "enums/proposal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ProposalHeading = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  let profileType = "";

  const [type, setType] = useState(searchParams.get("type") || profileType);

  const handleTypeChange = (type: string) => {
    if (!profileType) {
      const params = new URLSearchParams(searchParams);
      params.set("type", type);
      router.push(`${pathname}?${params.toString()}`);
    }
    setType(type);
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          gap: "0.5rem",
          ml: "2.5rem",
          mr: "4rem",
        }}
      >
        <TextXs
          text="VALUES  PERSONA"
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textAlign: "center",
          }}
        />

        {EProposalProfiles.VALUES_PROFILE && (
          <Stack
            sx={{
              gap: "0.5rem",
            }}
          >
            {proposalValuesProfile.map((profile, index) => {
              let isActiveTab = type === profile.name;

              return (
                <TextButton
                  key={index}
                  text={profile.name}
                  endIcon={
                    <CircleChip
                      text={profile.value}
                      isActiveTab={isActiveTab}
                      sx={{
                        fontSize: "0.75rem !important",
                        backgroundColor: isActiveTab
                          ? "var(--lightest-blue)"
                          : "var(--gray-100)",
                        lineHeight: "1.125rem",
                      }}
                    />
                  }
                  onClick={() => {
                    handleTypeChange(profile.name);
                  }}
                  sx={{
                    color: isActiveTab
                      ? "var(--primary)"
                      : "var(--text-primary)",
                    background: isActiveTab
                      ? "var(--lightest-blue-opa)"
                      : "transparent",
                    justifyContent: "flex-start",
                    fontStyle: "normal",
                    lineHeight: "1.125rem",
                    fontSize: "0.875rem",
                  }}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default ProposalHeading;
