import { Stack } from "@mui/material";
import { financialCustomEmojiQuestion } from "constants/data";
import Image from "next/image";

interface Props {
  onClick: (value: number) => void;
  value: string | number;
}

const EmojiCard = ({ value, onClick }: Props) => {
  return (
    <Stack direction={"row"}>
      {financialCustomEmojiQuestion.map((item, index) => (
        <Stack
          onClick={() => {
            onClick(index + 1);
          }}
          key={index}
          sx={{
            width: "4.875rem",
            height: "2rem",
            border: "1px solid var(--gray-500)",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: index === 0 ? "0.5rem" : "0rem",
            borderBottomLeftRadius: index === 0 ? "0.5rem" : "0rem",
            borderTopRightRadius: index === 4 ? "0.5rem" : "0rem",
            borderBottomRightRadius: index === 4 ? "0.5rem" : "0rem",
            cursor: "pointer",
            backgroundColor: value == item.id ? item.bgColor : "white",
          }}
        >
          <Image
            priority
            src={value == item.id ? item.activeImg : item.img}
            alt="Logo Image"
            width={20}
            height={20}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default EmojiCard;
