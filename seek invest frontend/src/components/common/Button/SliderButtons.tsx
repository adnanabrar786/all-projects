import { Box, Stack } from "@mui/material";
import Chip from "components/common/Chip/Chip";
import TextXs from "components/common/Text/TextXs";

interface Props {
  buttonsItems: { text: string; secText: string | number }[];
  activeSliderButton: string;
  onClick: (buttonText: string) => void;
}

const SliderButtons = ({
  buttonsItems,
  activeSliderButton,
  onClick,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "var(--ghost-white)",
        borderRadius: "0.5rem",
        padding: "0.25rem",
        border: "1px solid var(--gray-100)",
        gap: "0.5rem",
        textAlign: "center",
        position: "relative",
        height: "2rem",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "0.2rem",
          ml: activeSliderButton == buttonsItems[0].text ? "0.5%" : "49.5%",
          transition: "all 0.3s",
          borderRadius: "0.375rem",
          backgroundColor: "var(--submenu-bg)",
          width: "50%",
        }}
      />
      {buttonsItems.map((button, index) => (
        <Stack
          direction={"row"}
          key={index}
          onClick={() => onClick(button.text)}
          sx={{
            width: "50%",
            zIndex: "1",
            cursor: "pointer",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <TextXs
            text={button.text}
            sx={{
              fontWeight: "500",
              transition: "all 0.3s",
              color:
                button.text === activeSliderButton
                  ? "var(--primary)"
                  : "var(--text-secondary)",
            }}
          />
          <Chip
            text={button.secText.toString()}
            sx={{
              transition: "all 0.3s",
              backgroundColor:
                button.text === activeSliderButton
                  ? "var(--light-sky-blue)"
                  : "var(--gray-100)",
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default SliderButtons;
