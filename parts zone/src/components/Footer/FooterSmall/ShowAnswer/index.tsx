import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Collapse, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

interface Props {
  title: string;
  description: any;
}

export default function ShowAnswer({ title, description }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <Stack
        onClick={() => setShowAnswer(!showAnswer)}
        direction={"row"}
        spacing={4}
        sx={{
          padding: { lg: "2rem", xs: "1rem 1.5rem" },

          ".largeSvg": {
            display: { lg: "initial", xs: "none" },
            transform: showAnswer ? "rotate(0deg)" : "rotate(180deg)",
            transition: "all 0.3s ease",
          },
          ".smallSvg": {
            display: { lg: "none", xs: "initial" },
            transform: showAnswer ? "rotate(0deg)" : "rotate(180deg)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <Stack
          sx={{
            flex: "1",
            transition: "all 0.3s ease",
            gap: showAnswer ? 4 : 0,
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
            {title}
          </Typography>
          <Collapse in={showAnswer}>
            <Typography
              sx={{ fontSize: "1rem", color: "#c4c2c2" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Collapse>
        </Stack>

        <ExpandMoreOutlinedIcon
          sx={{
            width: "1.7rem",
            height: "1.7rem",

            transform: showAnswer ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.3s",
            cursor: "pointer",
            color: "#fff",
          }}
        />
      </Stack>
    </>
  );
}
