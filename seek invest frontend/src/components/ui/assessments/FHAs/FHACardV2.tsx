import { ClickAwayListener, Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import AssessmentDeleteModal from "components/ui/ShareAssessment/AssessmentDeleteModal";
import FHAContextMenu from "components/ui/assessments/FHAs/FHAContextMenu";
import TemplateCard from "components/ui/assessments/NewFHA/TemplateCard";
import {
  CircleCheckFilledIcon,
  CircleOutlinedIcon,
  DotsVerticalIcon,
} from "constants/images.routes";
import { SHARE_ASSESSMENT } from "constants/pages.routes";
import Image from "next/image";
import { useState } from "react";
import { stripCharacters } from "utils/string";

interface Props {
  index: number;
  title: string;
  type: string;
  responses?: number;
  assessmentId: string;
  icon: string;
  setSelectedFHA?: (selectedFHA: number) => void;
}

const FHACardV2 = ({
  index,
  title,
  responses,
  setSelectedFHA,
  assessmentId,
  type,
  icon,
}: Props) => {
  const [deleteAssessmentModal, setDeleteAssessmentModal] = useState(false);

  const [clicked, setClicked] = useState<boolean>(false);

  const secondaryTextStyle = {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    lineHeight: " 1.25rem",
  };

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setClicked(false);
        }}
      >
        <Stack>
          <TemplateCard
            assessmentTemplate={{
              name: title,
              icon: icon,
              type: type,
              url: `${SHARE_ASSESSMENT}/${assessmentId}`,
              id: assessmentId,
              comingSoon: false,
            }}
            index={index}
          />

          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.3rem",
              marginTop: "0.92rem",
            }}
          >
            <Stack sx={{ gap: "0.25rem", flex: "1" }}>
              <TextXs
                text={stripCharacters(title)}
                sx={{
                  color: "var(--text-primary)",
                  fontWeight: "600",
                  lineHeight: "1.25rem",
                }}
              />

              <Stack
                direction={"row"}
                sx={{ alignItems: "center", gap: "0.3rem" }}
              >
                <Image
                  priority
                  src={
                    responses && responses > 0
                      ? CircleCheckFilledIcon
                      : CircleOutlinedIcon
                  }
                  alt={"circle icon"}
                  width={14}
                  height={14}
                />

                <TextXs
                  text={
                    responses && responses > 0
                      ? `${responses} ${
                          responses > 1 ? "responses" : "response"
                        }`
                      : "No response"
                  }
                  sx={secondaryTextStyle}
                />
              </Stack>
            </Stack>

            <Stack
              sx={{
                position: "relative",
                width: "1rem",
                height: "1rem",
                img: {
                  position: "absolute",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                if (setSelectedFHA) {
                  setSelectedFHA(index);
                  setClicked(!clicked);
                }
              }}
            >
              <Image priority src={DotsVerticalIcon} alt={"icon"} fill />

              <Stack
                sx={{
                  position: "static",
                }}
              >
                {clicked && (
                  <FHAContextMenu
                    assessmentId={assessmentId}
                    coords={{ x: 12, y: 0 }}
                    setClicked={setClicked}
                    type={type}
                    setDeleteAssessmentModal={setDeleteAssessmentModal}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ClickAwayListener>

      {deleteAssessmentModal && (
        <AssessmentDeleteModal
          ShowModal={deleteAssessmentModal}
          setShowModal={setDeleteAssessmentModal}
          assessmentId={assessmentId}
        />
      )}
    </>
  );
};

export default FHACardV2;
