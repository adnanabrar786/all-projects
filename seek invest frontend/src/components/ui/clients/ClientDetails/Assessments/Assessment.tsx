import {
  Box,
  ClickAwayListener,
  ListItemButton,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import MenuCard from "components/common/Card/MenuCard";
import TextXs from "components/common/Text/TextXs";
import AssessmentDeleteModal from "components/ui/ShareAssessment/AssessmentDeleteModal";
import AssessmentViewModal from "components/ui/clients/ClientDetails/Assessments/AssessmentViewModal";
import { ChevronDownSecondaryIcon } from "constants/images.routes";
import { EClientAssessmentStatus } from "enums/assessment";
import { IClientAssessment } from "interfaces/assessment";
import Image from "next/image";
import { useState } from "react";
import { getDateThFormat } from "utils/date";
import { stripCharacters } from "utils/string";

const { COMPLETED, IN_PROGRESS, SENT } = EClientAssessmentStatus;

interface Props {
  assessment: IClientAssessment;
  totalAssessments: number;
  index: number;
}

const Assessment = ({ assessment, totalAssessments, index }: Props) => {
  let menus = ["View", "Delete"];

  const [deleteAssessmentModal, setDeleteAssessmentModal] = useState(false);
  const [viewAssessmentModal, setViewAssessmentModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  let statusColor = "";
  let statusText = "";

  switch (assessment.status) {
    case SENT:
      statusColor = "var(--dark-orange)";
      statusText = "Sent";
      break;
    case IN_PROGRESS:
      statusColor = "var(--primary-300)";
      statusText = "In Progress";
      break;
    case COMPLETED:
      statusColor = "var(--dark-green)";
      statusText = "Completed";
      break;

    default:
      break;
  }

  return (
    <TableRow
      sx={{
        ".MuiTableCell-root": {
          height: "2rem",
          borderBottom:
            totalAssessments != index ? "1px solid var(--gray-300)" : "none",
        },
      }}
    >
      <TableCell>
        <Stack direction={"row"} sx={{ gap: "0.5rem" }}>
          <TextXs
            sx={{
              lineHeight: "1.25rem",
              color: "var(--text-secondary)",
              fontWeight: "500",
            }}
            text={stripCharacters(assessment.name)}
          />
          {assessment.tag && (
            <TextXs
              sx={{
                border: "1px solid var(--gray-300)",
                fontSize: " 0.75rem",
                borderRadius: " 0.375rem",
                padding: "0.12rem 0.38rem",
                fontWeight: "Primary",
              }}
              text={assessment.tag}
            />
          )}
        </Stack>
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            lineHeight: "1.25rem",
            color: "var(--text-primary)",
          }}
          text={assessment.type}
        />
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            lineHeight: "1.25rem",
            color: "var(--text-primary)",
          }}
          text={getDateThFormat(assessment.created_at)}
        />
      </TableCell>

      <TableCell>
        {assessment.status === COMPLETED && assessment.updated_at && (
          <TextXs
            sx={{
              lineHeight: "1.25rem",
              color: "var(--text-primary)",
            }}
            text={getDateThFormat(assessment.updated_at)}
          />
        )}
      </TableCell>

      <TableCell>
        <Stack direction="row" sx={{ alignItems: "center", gap: "0.25rem" }}>
          <Box
            sx={{
              width: "0.5rem",
              height: "0.5rem",
              backgroundColor: statusColor,
              borderRadius: "50%",
            }}
          />
          <TextXs
            sx={{
              lineHeight: "1.25rem",
              color: "var(--text-primary)",
            }}
            text={statusText}
          />
        </Stack>
      </TableCell>

      <TableCell sx={{ position: "relative" }}>
        {assessment.status === COMPLETED && (
          <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
            <Box>
              <FilledButton
                text="Action"
                onClick={() => setOpenMenu(!openMenu)}
                secondary
                sx={{ img: { mt: "0.25rem" }, height: "2.25rem" }}
                endIcon={
                  <Image
                    priority
                    src={ChevronDownSecondaryIcon}
                    alt={"icon"}
                    width={15}
                    height={15}
                  />
                }
              />

              {openMenu && (
                <MenuCard
                  sx={{
                    width: "7.3125rem",
                    left: "0",
                    backgroundColor: "white",
                    top: "60px",
                  }}
                >
                  {" "}
                  {menus.map((menu) => (
                    <ListItemButton
                      onClick={() => {
                        switch (menu) {
                          case "View":
                            setViewAssessmentModal(true);
                            break;
                          case "Delete":
                            setDeleteAssessmentModal(true);

                            break;
                          default:
                            break;
                        }
                      }}
                      key={menu}
                      sx={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.8125rem",
                        paddingY: "0.8rem",
                        minWidth: "10rem",
                        fontWeight: "500",
                        color:
                          menu === "Delete"
                            ? "var(--carnelian)"
                            : "var(--text-primary)",
                      }}
                    >
                      {menu}
                    </ListItemButton>
                  ))}
                </MenuCard>
              )}
            </Box>
          </ClickAwayListener>
        )}

        {deleteAssessmentModal && (
          <AssessmentDeleteModal
            clientAssessment
            ShowModal={deleteAssessmentModal}
            setShowModal={setDeleteAssessmentModal}
            assessmentId={assessment.id}
          />
        )}

        {viewAssessmentModal && (
          <AssessmentViewModal
            showModal={viewAssessmentModal}
            setShowModal={setViewAssessmentModal}
            assessment={assessment}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default Assessment;
