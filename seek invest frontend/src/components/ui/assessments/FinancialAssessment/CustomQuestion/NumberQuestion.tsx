import { Stack } from "@mui/material";
import TextLg from "components/common/Text/TextLg";
import TextXs from "components/common/Text/TextXs";

const NumberQuestion = () => {
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
      >
        {/* <NumberCard
          selectedIndex={selectedIndex}
          setSelectedIndex={setselectedIndex}
        /> */}

        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <TextXs
            sx={{
              fontWeight: "500",
              lineHeight: "1.25rem",
              color: "var(--text-secondary)",
            }}
            text="Not happy"
          />
          <TextXs
            sx={{
              fontWeight: "500",
              lineHeight: "1.25rem",
              color: "var(--text-secondary)",
            }}
            text="Very happy"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NumberQuestion;
