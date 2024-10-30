import { Skeleton, Stack } from "@mui/material";
import HintText from "components/common/HintText";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { FHAsFilledIcon } from "constants/images.routes";
import { FHAS } from "constants/pages.routes";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import useAssessmentOverview from "hooks/useAssessmentOverview";
import useAssessmentOwnerDetailsData from "hooks/useAssessmentOwnerDetailsData";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
dayjs.extend(advancedFormat);

const HeaderEdit = () => {
  const { assessmentId }: { assessmentId: string } = useParams();
  const { assessmentData } = useAssessmentOverview(assessmentId);

  const { assessmentOwnerDetails } =
    useAssessmentOwnerDetailsData(assessmentId);

  return (
    <Stack
      direction={"row"}
      sx={{
        paddingX: "2rem",
        paddingTop: "1.85rem",
        justifyContent: "space-between",
      }}
    >
      <Stack>
        {assessmentData ? (
          <TextMd text={assessmentData.name} />
        ) : (
          <Skeleton width={"10rem"} />
        )}

        <Stack
          direction={"row"}
          sx={{ alignItems: "center", gap: "0.3rem", paddingTop: "0.65rem" }}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              padding: "0.25rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--green-light)",
            }}
          >
            <Image
              className="fha icon"
              priority
              src={FHAsFilledIcon}
              alt={"icon"}
              width={16}
              height={16}
            />
          </Stack>

          {assessmentOwnerDetails ? (
            <TextXs
              text={`Created by ${
                assessmentOwnerDetails.first_name || "SeekInvest"
              } ${assessmentOwnerDetails.last_name} on ${
                assessmentOwnerDetails?.created_at
                  ? dayjs(assessmentOwnerDetails?.created_at).format(
                      "Do MMM , YYYY"
                    )
                  : "-"
              }`}
              sx={{ color: "var(--text-secondary)" }}
            />
          ) : (
            <Skeleton width={"15rem"} />
          )}
        </Stack>
      </Stack>

      <Link href={FHAS}>
        <HintText text="Back to FHAs" />
      </Link>
    </Stack>
  );
};

export default HeaderEdit;
