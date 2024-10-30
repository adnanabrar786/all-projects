import TextXs from "components/common/Text/TextXs";

interface Props {
  text: string;
}
const ErrorChip = ({ text }: Props) => {
  return (
    <TextXs
      text={text}
      sx={{
        fontSize: "0.75rem",
        padding: "0.75rem",
        background: "var(--red-lightest)",
        borderRadius: "0.5rem",
        textAlign: "center",
      }}
    />
  );
};

export default ErrorChip;
