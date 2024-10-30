import sampleData from "@/data/accordion.json";
import { GeneratePrompt } from "@/interface/prompt.interface";
import { Colors } from "@/utils/enums/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import AccordionFilter from "../AccordionFilter";
import { getTabsIcon } from "../tabIcon";

type Prop = {
  selectedData: Partial<GeneratePrompt>;
  onChange: (key: string, value: string) => void;
  icon?: JSX.Element;
};

export default function AccordionSection({
  icon,
  selectedData,
  onChange,
}: Prop) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [type, setType] = useState("");

  const handleAccordionChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!expanded) {
          setType("");
        }
      }}
    >
      <div>
        {sampleData.map((item, i) => {
          return (
            <Accordion
              onClick={() => {
                if (type !== item.title) {
                  setType(item.title);

                  return;
                }
              }}
              expanded={expanded === item.title}
              onChange={handleAccordionChange(item.title)}
              key={item.title}
              sx={{
                fontFamily: "Exo",
                "&.MuiPaper-root": { marginY: "0.3rem" },
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "3.8rem",
                  backgroundColor:
                    expanded === item.title ? Colors.ZOMP : "var(--lavender)",
                  ".MuiSvgIcon-root": {
                    color: expanded === item.title ? "white" : "inherit",
                  },
                  transition: "none",
                  ":focus": {
                    backgroundColor: Colors.ZOMP,
                    color: "white",
                    ".MuiSvgIcon-root": { color: "white" },
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box key={i}>{getTabsIcon(item.title, type)}</Box>

                <Typography
                  sx={{
                    color: "var(--textWhite)",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    marginLeft: "1rem",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    alignItems: "center",
                    color: type === item.title ? "white" : "#2D969B",
                    marginTop: "0.1rem",
                    marginLeft: "auto",
                  }}
                >
                  {Object.keys(selectedData).includes(
                    item.title.toLocaleLowerCase(),
                  )
                    ? 1
                    : 0}{" "}
                  selected
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                sx={{
                  paddingX: "0rem !important",
                  paddingY: "0.13rem !important",
                  backgroundColor: "var(--antiflash)",
                  height: " 11.25rem",
                  color: "blue",
                }}
              >
                <AccordionFilter
                  selectedData={selectedData}
                  title={item.title}
                  options={item.options}
                  onChange={onChange}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </ClickAwayListener>
  );
}
