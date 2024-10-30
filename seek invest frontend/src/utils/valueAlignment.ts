import {
  ArrowDownRedIcon,
  ArrowUpGreenIcon,
  CheckGreenIcon,
  compassRoundGreenIcon,
  CompassRoundRedIcon,
  CompassRoundYellowIcon,
  CrosshairGreenIcon,
  CrosshairRedIcon,
  CrosshairYellowIcon,
  MinusYellowIcon,
} from "constants/images.routes";
import { EAssessmentTemplateTypes } from "enums/assessment";
import { ALIGNMENTS_SCORE_LABEL, ETopicType } from "enums/enums";
import { EPreference } from "enums/framework";
import { IKeyAreas } from "interfaces/client";

const { RISK } = EAssessmentTemplateTypes;
const { LOW, HIGH, MEDIUM } = ALIGNMENTS_SCORE_LABEL;
const { PRODUCT, NON_PRODUCT } = ETopicType;
const { EMBRACE, OPPOSE } = EPreference;

export const getRiskValuesAlignment = (riskAlignData, type) => {
  switch (riskAlignData.statusText) {
    case LOW:
      riskAlignData.color = "var(--carnelian-light)";
      riskAlignData.bgColor = "var(--red-shadwow)";
      riskAlignData.icon =
        type === RISK ? CrosshairRedIcon : CompassRoundRedIcon;
      riskAlignData.statusIcon = ArrowDownRedIcon;
      break;
    case MEDIUM:
      riskAlignData.color = "var(--mikado-yellow-dark)";
      riskAlignData.bgColor = "var(--red-shadwow2)";
      riskAlignData.icon =
        type === RISK ? CrosshairYellowIcon : CompassRoundYellowIcon;
      riskAlignData.statusIcon = MinusYellowIcon;
      break;
    case HIGH:
      riskAlignData.color = "var(--text-success2)";
      riskAlignData.bgColor = "var(--red-shadwow5)";
      riskAlignData.icon =
        type === RISK ? CrosshairGreenIcon : compassRoundGreenIcon;
      riskAlignData.statusIcon = ArrowUpGreenIcon;
      break;

    default:
      riskAlignData.color = "var(--text-success2)";
      riskAlignData.bgColor = "var(--red-shadwow5)";
      if (riskAlignData.status_label) {
        riskAlignData.statusText = "Assessment sent";
      }
      riskAlignData.statusIcon = CheckGreenIcon;
      break;
  }

  return riskAlignData;
};

export const getValueAlignmentBg = (value: ALIGNMENTS_SCORE_LABEL) => {
  switch (value) {
    case LOW:
      return {
        backgroundColor: "var(--red-shadwow)",
        color: "var(--carnelian-light)",
      };
    case MEDIUM:
      return {
        backgroundColor: "var(--red-shadwow2)",
        color: "var(--mikado-yellow-dark)",
      };
    case HIGH:
      return {
        backgroundColor: "var(--red-shadwow5)",
        color: "var(--text-success2)",
      };

    default:
      break;
  }
};

export const getValueAlignmentBgPDF = (value: ALIGNMENTS_SCORE_LABEL) => {
  switch (value) {
    case LOW:
      return {
        backgroundColor: "#fef3f2",
        color: "#d92d20",
      };
    case MEDIUM:
      return {
        backgroundColor: "#fffaeb",
        color: "#dc6803",
      };
    case HIGH:
      return {
        backgroundColor: "#ecfdf3",
        color: "#039855",
      };

    default:
      return {
        backgroundColor: "transparent",
        color: "#000000",
      };
  }
};

export const getTopicNull = ({
  type,
  preference,
  value,
}: Pick<IKeyAreas, "type" | "preference"> & { value: number | null }) => {
  switch (type) {
    case PRODUCT:
      return (
        (preference === EMBRACE && value === 0) ||
        (preference === OPPOSE && value === 100)
      );

    case NON_PRODUCT:
      return value !== 0 && value !== null ? false : true;

    default:
      break;
  }
};
