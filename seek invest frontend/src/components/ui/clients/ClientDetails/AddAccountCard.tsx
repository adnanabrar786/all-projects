import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextXs from "components/common/Text/TextXs";

interface Props {
  title: string;
  details: string;
  buttonText: string;
}

const AddAccountCard = ({ title, details, buttonText }: Props) => {
  return (
    <>
      <Stack
        sx={{
          border: "1px solid var(--gray-200)",
          borderRadius: "0.5rem",
          alignItems: "center",
          padding: "1.12rem",
          paddingBottom: "1.18rem",
        }}
      >
        <TextXs
          sx={{
            fontSize: "0.75rem",
            fontWeight: "600",
            lineHeight: "1.125rem",
          }}
          text={title}
        />
        <TextXs
          sx={{
            color: "var(--text-secondary)",
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
            width: "23.64206rem",
            textAlign: "center",
          }}
          text={details}
        />
        <FilledButton
          sx={{
            marginTop: "0.5rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "0.5rem",
          }}
          text={buttonText}
          secondary
        />
      </Stack>
    </>
  );
};

export default AddAccountCard;
