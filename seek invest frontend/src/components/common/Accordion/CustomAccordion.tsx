import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  SxProps,
} from "@mui/material";
import BgIcon from "components/common/Icon/BgIcon";
import TextXs from "components/common/Text/TextXs";
import { MenuIcon } from "constants/images.routes";
import Image from "next/image";
import { ReactNode, useState } from "react";

interface Props {
  icon: string;
  title: string;
  desc?: string;
  children: ReactNode;
  sx?: SxProps;
  sxSummary?: SxProps;
  sxIcon?: SxProps;
  expandIcon?: ReactNode;
  filledButton?: ReactNode;
  endComponent?: ReactNode;
  showMenuIcon?: boolean;
  hideMenuIcon?: boolean;
  addIcon?: boolean;
  questionNumber?: number;
  iconWidth?: number;
  iconHeight?: number;
  open?: boolean;
  disableExpand?: boolean;
  sxTitle?: SxProps;
}

const CustomAccordion = ({
  icon,
  title,
  desc,
  children,
  sxSummary,
  sx,
  sxIcon,
  expandIcon,
  endComponent,
  showMenuIcon,
  addIcon,
  questionNumber,
  hideMenuIcon,
  iconWidth = 21,
  iconHeight = 20,
  sxTitle,
  open,
  filledButton,
  disableExpand,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(open || false);

  const handleOpen = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "flex-start",
        gap: "0.37rem",
        ".menuIcon": {
          transition: "none",
          opacity: !expanded && showMenuIcon ? 1 : 0,
          marginTop: "1.875rem",
          cursor: "pointer",
        },
      }}
    >
      {!hideMenuIcon && (
        <Image
          onClick={() => setExpanded(true)}
          className="menuIcon"
          priority
          src={MenuIcon}
          alt={"icon"}
          width={16}
          height={16}
        />
      )}

      <Accordion
        elevation={0}
        expanded={expanded && !disableExpand}
        onChange={() => {}}
        sx={{
          border: "1px solid var(--gray-200)",
          borderRadius: "0.5rem",
          margin: "0",
          width: "100%",
          ...sx,
        }}
      >
        <AccordionSummary
          onClick={() => {
            if (expandIcon) {
              handleOpen();
            }
          }}
          expandIcon={expandIcon}
          sx={{
            "& .MuiAccordionSummary-content": {
              marginTop: "10px",
              minHeight: "60px",
            },
            "& .Mui-expanded": { marginY: "10px" },
            ...sxSummary,
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              gap: "0.5rem",
              alignItems: "center",
              flex: "1",
            }}
            onClick={handleOpen}
          >
            {questionNumber && (
              <TextXs
                text={`${questionNumber}`}
                sx={{
                  position: "absolute",
                  left: questionNumber < 10 ? "-24px" : "-28px",
                  border: "1px solid var(--gray-200)",
                  borderRadius: "0.25rem 0 0 0.25rem",
                  borderRight: "none",
                  paddingX: "0.45rem",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                }}
              />
            )}

            <BgIcon
              icon={icon}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
              sx={{
                img: {
                  transform:
                    addIcon && expanded ? "rotate(45deg)" : "rotate(0)",
                },
                ...sxIcon,
              }}
            />

            <Stack>
              <TextXs text={title} sx={{ fontWeight: "600", ...sxTitle }} />

              {desc && (
                <TextXs text={desc} sx={{ color: "var(--text-secondary)" }} />
              )}
            </Stack>
            {filledButton}
          </Stack>
          {endComponent}
        </AccordionSummary>

        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default CustomAccordion;
