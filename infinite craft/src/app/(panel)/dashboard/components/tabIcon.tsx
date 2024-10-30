import { ActionIcon } from "@/assets/icons/action";
import { LanguageIcon } from "@/assets/icons/language";
import { LengthIcon } from "@/assets/icons/length";
import { ResponseIcon } from "@/assets/icons/response";
import { StyleIcon } from "@/assets/icons/style";
import { ToneIcon } from "@/assets/icons/toneIcon";
import { TopicIcon } from "@/assets/icons/topic";
import { TypeIcon } from "@/assets/icons/types";

export const getTabsIcon = (title: string, type: string) => {
  switch (title) {
    case "Tone":
      return <ToneIcon tone={type === title ? "#FFFFFF" : "#2D969B"} />;
    case "Style":
      return <StyleIcon style={type === title ? "#FFFFFF" : "#2D969B"} />;
    case "Language":
      return <LanguageIcon language={type === title ? "#FFFFFF" : "#2D969B"} />;
    case "Response":
      return <ResponseIcon response={type === title ? "#FFFFFF" : "#2D969B"} />;

    case "Topic":
      return <TopicIcon topic={type === title ? "#FFFFFF" : "#2D969B"} />;
    case "Action":
      return <ActionIcon action={type === title ? "#FFFFFF" : "#2D969B"} />;
    case "Length":
      return <LengthIcon length={type === title ? "#FFFFFF" : "#2D969B"} />;
    case "Types":
      return <TypeIcon type={type === title ? "#FFFFFF" : "#2D969B"} />;

    default:
      break;
  }
};
