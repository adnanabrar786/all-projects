"use client";

import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  prompt: string;
  answer: string;
}

export default function Prompts({ prompt, answer }: Props) {
  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    setUnliked(false);
  };

  const handleUnlikeClick = () => {
    setUnliked(!unliked);
    setLiked(false);
  };

  return (
    <>
      <Stack
        sx={{
          padding: { lg: "2rem", xs: "1rem 0.5rem" },
          border: "1px solid #464646",
          // height: '15.6875rem',
          // width: '77.5rem',
          borderRadius: "1.5rem",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { lg: "1.75rem", xs: "1.25rem" },
            fontWeight: "600",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
        >
          {prompt}
        </Typography>
        <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
          {answer}
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            alignSelf: "end",
            // flex: 'end',
            marginTop: "1rem",
          }}
        >
          {/* <Button
            variant="contained"
            sx={{
              padding: '0.9rem 1.3rem 0.9rem 1.3rem',
              width: '7.5rem',
              height: '2.5rem',
              background: '#fff',
              color: '#000',
              fontStyle: 'Exo',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <ThumbUpIcon
              sx={{
                color: '#2D9B59',
              }}
            />
            Like
          </Button>
          <Button
            variant="contained"
            sx={{
              padding: '0.9rem 1.3rem 0.9rem 1.3rem',
              width: '7.5rem',
              height: '2.5rem',
              fontStyle: 'Exo',
              border: '1px solid #464646',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
            }}
          >
            <ThumbDownAltIcon
              sx={{
                color: '#D25050',
              }}
            />
            Unlike
          </Button> */}
          <Button
            // variant="contained"
            sx={{
              padding: "0.9rem 1.3rem 0.9rem 1.3rem",
              width: "7.5rem",
              height: "2.5rem",
              // backgroundColor: liked ? 'var(--textWhite)' : 'transparent',
              background: liked ? "#ffffff" : "transparent",
              color: liked ? "#000" : "#fff",
              fontStyle: "Exo",
              border: liked ? "" : "1px solid #464646",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onClick={handleLikeClick}
          >
            <ThumbUpIcon sx={{ color: "#2D9B59" }} />

            {liked ? "Liked" : "Like"}
          </Button>

          <Button
            // variant="contained"
            sx={{
              padding: "0.9rem 1.3rem 0.9rem 1.3rem",
              width: "7.5rem",
              height: "2.5rem",
              background: unliked ? "#fff" : "transparent",
              color: unliked ? "#000" : "#fff",
              fontStyle: "Exo",
              alignItems: "center",
              gap: "0.5rem",

              border: unliked ? "" : "1px solid #464646",
            }}
            onClick={handleUnlikeClick}
          >
            <ThumbDownAltIcon sx={{ color: "#D25050" }} />

            {unliked ? "Unliked" : "Unlike"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
