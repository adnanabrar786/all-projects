"use client";
import SaveIcon from "@/assets/icons/saveIcon.svg";
import {
  EditPrompt,
  PromptList,
  SavePrompt,
} from "@/interface/prompt.interface";
import { reGeneratePrompt, savePrompt } from "@/services/prompt.service";
import { RootState } from "@/store";
import { Colors } from "@/utils/enums/colors";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Iprops {
  list: PromptList[];
}
export default function PromptAccordion(props: Iprops) {
  const { list } = props;

  const [promptList, setPromptList] = useState<PromptList[]>([]);

  useEffect(() => {
    setPromptList(list);
  }, [list]);
  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

  const premium: string = user?.subscription;

  const [expanded, setExpanded] = useState<number | false>(false);
  const linkButtonRef = useRef(null);
  const [buttonIcon, setButtonIcon] = useState(<ContentCopyOutlinedIcon />);
  const [loading, setLoading] = useState(false);

  const handleClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt Copied Successfully");
  };

  const handleAccordionChange =
    (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSaved = useCallback(
    async (event: React.MouseEvent<HTMLElement>, saveData: SavePrompt) => {
      try {
        event.stopPropagation();
        const response = await savePrompt(saveData, token);
        if (!response.error) toast.success("Prompt saved Successfully");
      } catch (error) {
        toast.error("Prompt saved Successfully");
      }
    },
    [token],
  );

  const [index, setIndex] = useState(0);
  const handleRegenerate = useCallback(
    async (
      event: React.MouseEvent<HTMLElement>,
      editPrompt: EditPrompt,
      index: number,
    ) => {
      event.stopPropagation();
      setLoading(true);
      setIndex(index);
      try {
        const response = await reGeneratePrompt(editPrompt, token);
        if (!response) toast.error("failed to regenerate");
        const newList = [...list];
        newList[index] = response;
        setPromptList(newList);
      } catch (error) {
        toast.error("failed to regenerate");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return (
    <div>
      {!!promptList.length &&
        promptList?.map((item, indx) => {
          return (
            <Accordion
              expanded={expanded === indx}
              onChange={handleAccordionChange(indx)}
              key={indx}
              sx={{
                fontFamily: "Exo",
                color: "var(--textWhite)",
                backgroundColor: "var(--backgroundwhite)",
                "&.MuiPaper-root": { marginY: "0.3rem" },
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                sx={{
                  ".MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(90deg)",
                  },

                  height: "3.938rem",
                  ".MuiSvgIcon-root": {
                    color: Colors.ZOMP,
                    // transform: 'rotate(-90deg)',
                  },
                }}
                expandIcon={<KeyboardArrowRightOutlinedIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
                    {item.heading}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "0.8rem",
                      marginRight: "0.6rem",
                    }}
                  >
                    {/* <ShareIcon /> */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaved(e, item);
                      }}
                    >
                      <SaveIcon />
                    </Button>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  // backgroundColor: Colors.GHOST_WHITE,
                  backgroundColor: "var(--backgroundwhite)",
                  padding: "0.9rem 0.6rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "var(--lightwhite)",
                      fontWeight: "600",
                    }}
                  >
                    {item.body}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", gap: "0.613rem", marginTop: "20px" }}
                >
                  {loading && index === indx ? (
                    <Box
                      sx={{
                        width: "83.73px",
                        height: "25.59px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress size={20} />
                    </Box>
                  ) : (
                    <>
                      <Button
                        sx={{
                          border: `0.06rem solid ${Colors.LIGHT_STEEL_BLUE}`,
                          // width: "6.4375rem",
                          display: "flex",
                          justifyContent: "space-between",
                          height: "1.6rem",
                        }}
                        onClick={(e) => handleRegenerate(e, item, indx)}
                      >
                        <RefreshOutlinedIcon
                          sx={{
                            position: "relative",
                            top: "-1px",
                            color: Colors.ZOMP,
                            display: "flex",
                            justifyItems: "center",
                            alignItems: "center",
                            height: "0.8125rem",
                            width: "0.8125rem",
                            // paddingLeft: "0.3rem",
                            // marginLeft: '0.1rem',
                          }}
                        />
                        <span
                          style={{
                            color: "var(--textwhite)",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                          }}
                        >
                          Regenerate
                        </span>
                      </Button>
                    </>
                  )}

                  <Box
                    sx={{
                      width: "1.375rem",
                      height: "1.438rem",
                      backgroundColor: Colors.ZOMP,
                      borderRadius: "0.19rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    {/* <LikeIcon /> */}
                    <ThumbUpOutlinedIcon
                      sx={{
                        color: Colors.WHITE,
                        display: "flex",
                        height: "1.063rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      border: `0.06rem solid ${Colors.LIGHT_STEEL_BLUE}`,
                      width: "1.375rem",
                      height: "1.438rem",
                      backgroundColor: "var(--white)",
                      borderRadius: "0.19rem",
                      display: "flex",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ThumbDownAltOutlinedIcon
                      sx={{
                        color: Colors.ZOMP,
                        display: "flex",
                        height: "1.063rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      border: `0.06rem solid ${Colors.LIGHT_STEEL_BLUE}`,
                      width: "1.375rem",
                      height: "1.438rem",
                      backgroundColor: "var(--white)",
                      borderRadius: "0.19rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ContentCopyOutlinedIcon
                      onClick={() => handleClick(item.body)}
                      sx={{
                        color: Colors.ZOMP,
                        display: "flex",
                        height: "1.063rem",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  {/* <Box
                  sx={{
                    border: `0.06rem solid ${Colors.LIGHT_STEEL_BLUE}`,
                    width: '1.375rem',
                    height: '1.438rem',
                    backgroundColor: Colors.WHITE,
                    borderRadius: '0.19rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IosShareOutlinedIcon
                    sx={{
                      color: Colors.ZOMP,
                      display: 'flex',
                      height: '1.063rem',
                    }}
                  />
                </Box> */}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
