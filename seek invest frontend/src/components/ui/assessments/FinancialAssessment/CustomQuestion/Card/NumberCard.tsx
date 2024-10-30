import { Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { financialCustomQuestion } from "constants/data";
import { RatingScale } from "interfaces/assessment";

interface Props {
  ratings: RatingScale;
  onClick: (value: number) => void;
  value: string | number;
}

const NumberCard = ({ onClick, value, ratings }: Props) => {
  return (
    <Stack sx={{ gap: "1rem" }}>
      <Stack direction={"row"}>
        {financialCustomQuestion.map((item, index) => (
          <Stack
            onClick={() => {
              onClick(item.id);
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
              backgroundColor:
                value == item.id ? "var(--ghost-whites)" : "white",
            }}
          >
            <TextXs
              sx={{
                fontWeight: "500",
                lineHeight: "1.25rem",
                color: "var(--text-secondary)",
              }}
              text={item.title}
            />
          </Stack>
        ))}
      </Stack>

      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", width: "24.375rem" }}
      >
        <TextXs text={ratings.start_value_label || ""} />
        <TextXs text={ratings.end_value_label || ""} />
      </Stack>
    </Stack>
  );
};

export default NumberCard;
