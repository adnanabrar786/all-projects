import { Text, TextProps } from "@react-pdf/renderer";

interface Props extends TextProps {
  text: string;
}

const ChipPDF = ({ text, style }: Props) => {
  return (
    <Text
      style={{
        fontSize: "8px",
        fontWeight: "medium",
        padding: "2px 6px",
        borderRadius: "16px",
        ...style,
      }}
    >
      {text}
    </Text>
  );
};

export default ChipPDF;
