import { Stack } from "@mui/material";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import { DotIcon } from "constants/images.routes";
import { ECustomAssessmentTypes } from "enums/assessment";
import { INewAssessmentTemplate } from "interfaces/assessment";
import Image from "next/image";
import Link from "next/link";

const { CUSTOM, TEMPLATE } = ECustomAssessmentTypes;
interface Props {
  assessmentTemplate: INewAssessmentTemplate;
  index?: number;
}
const TemplateCard = ({ assessmentTemplate, index }: Props) => {
  return (
    <Link href={assessmentTemplate.url}>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "1.36rem 2.5rem",
          backgroundColor: "var(--gray-100)",
          borderRadius: "0.45981rem",
          position: "relative",
        }}
      >
        {assessmentTemplate.type === CUSTOM && (
          <TextXs
            text="Customized"
            sx={{
              position: "absolute",
              backgroundColor: "white",
              padding: "0.12rem 0.38rem",
              fontWeight: "500",
              border: "1px solid var(--gray-300)",
              borderRadius: "0.375rem",
              left: "0.64rem",
              top: "0.6rem",
              fontSize: "0.75rem",
            }}
          />
        )}

        {assessmentTemplate.icon && (
          <Image
            priority
            src={assessmentTemplate.icon}
            alt={"bg image"}
            width={181}
            height={116}
          />
        )}

        {assessmentTemplate.comingSoon && (
          <Stack
            sx={{
              backdropFilter: "blur(4px)",
              width: "100%",
              height: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconText
              icon={DotIcon}
              text="Coming Soon..."
              iconHeight={8}
              iconWidth={8}
              sxRow={{
                borderRadius: "1rem",
                padding: "0.125rem 0.5rem 0.125rem 0.375rem",
                border: "1px solid var(--primary2)",
                "> p": { color: "var(--primary2)" },
              }}
            />
          </Stack>
        )}
      </Stack>
    </Link>
  );
};

export default TemplateCard;
