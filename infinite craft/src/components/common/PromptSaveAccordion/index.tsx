"use client";
import { Colors } from "@/utils/enums/colors";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Box, Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  GetPromptList,
  PostLikeDislike,
  deletePrompt,
} from "@/services/prompt.service";
import { RootState } from "@/store";
import { Reaction } from "@/utils/enums/reaction";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useMutation } from "react-query";

export default function PromptSaveAccordion() {
  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

  const { data, isLoading, isError, refetch } = useQuery(["data", token], () =>
    GetPromptList(token),
  );

  const [expanded, setExpanded] = useState<string | false>(false);
  const linkButtonRef = useRef(null);
  const [buttonIcon, setButtonIcon] = useState(<ContentCopyOutlinedIcon />);
  const handleClick = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt Copied Successfully");
  };

  const handleAccordionChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { mutate: dislikePostMutation } = useMutation(PostLikeDislike);

  const handlePostLikeDislike = (id: string, reaction: string): any => {
    dislikePostMutation([id, reaction, token], {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const { mutate: deletePromptMutation } = useMutation(deletePrompt);

  const handleDeletePrompt =
    (id: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      deletePromptMutation([id, token], {
        onSuccess: () => {
          refetch();
          toast.success("Prompt delete Successfully");
        },
      });
    };

  return (
    <div>
      {!data?.error &&
        data?.data?.map(
          (
            item: {
              heading: string;
              prompt: string;
              reaction: string;
              id: string;
            },
            index: number,
          ) => {
            return (
              <Accordion
                key={index}
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
                      <Button onClick={handleDeletePrompt(item.id)}>
                        <DeleteOutlineOutlined />
                      </Button>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
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
                      {item.prompt}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "0.613rem",
                      marginTop: "20px",
                    }}
                  >
                    <Box
                      onClick={() =>
                        handlePostLikeDislike(
                          item.id,
                          item.reaction === "LIKE" ? "NONE" : "LIKE",
                        )
                      }
                      sx={{
                        border: `0.06rem solid ${Colors.LIGHT_STEEL_BLUE}`,
                        width: "1.375rem",
                        height: "1.438rem",
                        backgroundColor:
                          item.reaction === Reaction.LIKE
                            ? Colors.ZOMP
                            : "var(--white)",
                        borderRadius: "0.19rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <ThumbUpOutlinedIcon
                        sx={{
                          color:
                            item.reaction === Reaction.LIKE
                              ? Colors.WHITE
                              : Colors.ZOMP,
                          display: "flex",
                          height: "1.063rem",
                        }}
                      />
                    </Box>

                    <Box
                      onClick={() =>
                        handlePostLikeDislike(
                          item.id,
                          item.reaction === "UNLIKE" ? "NONE" : "UNLIKE",
                        )
                      }
                      sx={{
                        border: `0.06rem solid ${Colors.LIGHT_STEEL_BLUE}`,
                        width: "1.375rem",
                        height: "1.438rem",
                        backgroundColor:
                          item.reaction === Reaction.UNLIKE
                            ? Colors.ZOMP
                            : "var(--white)",
                        borderRadius: "0.19rem",
                        display: "flex",
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ThumbDownAltOutlinedIcon
                        sx={{
                          color:
                            item.reaction === Reaction.UNLIKE
                              ? Colors.WHITE
                              : Colors.ZOMP,
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
                        onClick={() => handleClick(item.prompt)}
                        sx={{
                          color: Colors.ZOMP,
                          display: "flex",
                          height: "1.063rem",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          },
        )}
    </div>
  );
}
