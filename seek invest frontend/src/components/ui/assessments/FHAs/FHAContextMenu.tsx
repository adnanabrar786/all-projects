import { ListItemButton, Stack } from "@mui/material";
import { SHARE_ASSESSMENT } from "constants/pages.routes";
import { EAssessmentActions, ECustomAssessmentTypes } from "enums/assessment";
import { useRouter } from "next/router";

const { TEMPLATE } = ECustomAssessmentTypes;
const { SHARE, DELETE } = EAssessmentActions;

interface Props {
  coords?: { x: number; y: number };
  setClicked: (clicked: boolean) => void;
  setDeleteAssessmentModal: (value: boolean) => void;
  assessmentId: string;
  type?: string;
}

const FHAContextMenu = ({
  coords,
  assessmentId,
  setClicked,
  type,
  setDeleteAssessmentModal,
}: Props) => {
  const router = useRouter();

  let menus = [SHARE, DELETE];

  if (type === TEMPLATE) {
    menus = [SHARE];
  }

  return (
    <Stack
      onClick={(e) => {
        e.stopPropagation();
      }}
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid var(--gray-300)",
        background: "#fff",
        position: "absolute",
        zIndex: "1",
        top: `${coords?.y}px`,
        left: `${coords?.x}px`,

        overflow: "hidden",
        boxShadow:
          "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
      }}
    >
      {menus.map((menu) => (
        <ListItemButton
          onClick={() => {
            switch (menu) {
              case SHARE:
                router.push(`${SHARE_ASSESSMENT}/${assessmentId}`);
                break;
              case DELETE:
                setDeleteAssessmentModal(true);

                break;
              default:
                break;
            }
            setClicked(false);
          }}
          key={menu}
          sx={{
            padding: "0.5rem 1rem",
            fontSize: "0.8125rem",
            paddingY: "0.8rem",
            minWidth: "10rem",
            color: menu === DELETE ? "var(--carnelian)" : "var(--text-primary)",
          }}
        >
          {menu}
        </ListItemButton>
      ))}
    </Stack>
  );
};

export default FHAContextMenu;
