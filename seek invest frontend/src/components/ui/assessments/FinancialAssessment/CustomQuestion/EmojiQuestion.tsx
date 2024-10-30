import { Stack } from "@mui/material";
import TextLg from "components/common/Text/TextLg";

const EmojiQuestion = () => {
  return (
    <Stack
      sx={{
        marginTop: "7rem",
      }}
    >
      <TextLg
        sx={{
          fontWeight: "400",
          lineHeight: "2rem",
          color: "var(--dark-blue)",
        }}
        text="How happy are you with this assessment?"
      />

      <Stack
        direction={"column"}
        sx={{
          marginTop: "1.5rem",
          width: "fit-content",
          gap: "0.37rem",
        }}
      ></Stack>
    </Stack>
  );
};

export default EmojiQuestion;
