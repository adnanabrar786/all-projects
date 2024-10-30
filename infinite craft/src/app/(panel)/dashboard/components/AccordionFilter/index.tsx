import { GeneratePrompt } from "@/interface/prompt.interface";
import { Colors } from "@/utils/enums/colors";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Prop {
  options: string[];
  title: string;
  onChange: (key: string, value: string) => void;
  selectedData: Partial<GeneratePrompt>;
}

export default function AccordionFilter({
  options,
  title, // messageTypes, // setMessageTypes, // newTitle,
  onChange,
  selectedData,
}: Prop) {
  const [word, setWord] = useState<string>();
  const [list, setList] = useState<string[]>([]);
  const [type, setType] = useState("");

  useEffect(() => {
    if (word) {
      const filteredList = options.filter((item) =>
        item.toLowerCase().includes(word.toLowerCase()),
      );
      setList(filteredList);
    }
  }, [word]);

  const updatedList = word ? list : options;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          border: `0.06rem solid ${Colors.GAINSBORO}`,
          height: "2rem",
          display: "flex",
          alignItems: "center",
          // backgroundColor: 'primary.main',
        }}
      >
        <TextField
          value={word}
          onChange={(e) => setWord(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  height: "1rem",
                  color: Colors.CHINESE_SILVER,
                }}
              />
            ),
          }}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              padding: "0rem",
              paddingLeft: "0.6rem",
            },
            fieldset: {
              border: "none",
              height: "1.188rem",
              fontSize: "0.9rem",
              width: "100%",
            },
          }}
        />
      </Box>
      <Stack
        sx={{
          backgroundColor: "var(--lightblack)",
          height: "8.75rem",
          overflow: "auto",
          // marginLeft: '0.1rem',
        }}
      >
        {updatedList?.map((item) => {
          return (
            <Stack
              direction={"row"}
              sx={{ alignItems: "center", gap: "0.25rem" }}
            >
              <Typography
                onClick={(e) => {
                  {
                    onChange(title.toLocaleLowerCase(), item);
                  }
                }}
                key={item}
                sx={{
                  color: "var(--textWhite)",
                  cursor: "pointer",
                  marginY: "0.438rem",
                  fontSize: "0.9rem",
                  marginTop: "0.6rem",
                  marginLeft: " 0.625rem",
                  ":hover": { color: Colors.ZOMP },
                }}
              >
                {item}
              </Typography>
              {Object.values(selectedData).includes(item) && (
                <DoneRoundedIcon sx={{ color: Colors.ZOMP }} />
              )}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}
