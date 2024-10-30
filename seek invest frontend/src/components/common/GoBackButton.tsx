import IconText from "components/common/IconText";
import { BackArrowIconColored } from "constants/images.routes";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface Props {
  url: string;
  text: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const GoBackButton = ({ url, text, onClick }: Props) => {
  return (
    <Link href={url} onClick={onClick}>
      <IconText
        text={text}
        icon={BackArrowIconColored}
        iconWidth={14}
        iconHeight={15}
        sxText={{
          fontSize: "0.75rem",
          color: "var(--primary)",
          fontWeight: "500",
          lineHeight: "1.125rem",
        }}
      />
    </Link>
  );
};

export default GoBackButton;
