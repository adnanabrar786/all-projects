import { Text, TextProps } from "@react-pdf/renderer";
import { InterFont } from "constants/fonts.routes";

interface Props extends TextProps {
  text: string;
}

const TextPDFMd = ({ text, style }: Props) => {
  return (
    <Text
      style={{
        fontSize: "18px",
        fontFamily: InterFont,
        color: "#344054",
        ...style,
      }}
    >
      {text}
    </Text>
  );
};

export default TextPDFMd;
