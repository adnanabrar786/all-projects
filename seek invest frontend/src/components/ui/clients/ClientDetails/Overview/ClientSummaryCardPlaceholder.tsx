import TextXs from "components/common/Text/TextXs";

interface Props {
  text: string;
}

const ClientSummaryCardPlaceholder = ({ text }: Props) => {
  return (
    <TextXs
      sx={{
        color: "var(--text-secondary)",
        fontSize: "0.75rem",
        lineHeight: "1.125rem",
        textAlign: "center",
        width: "14.0625rem",
      }}
      text={text}
    />
  );
};

export default ClientSummaryCardPlaceholder;
