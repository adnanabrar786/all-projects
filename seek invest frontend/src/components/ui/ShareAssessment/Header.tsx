import { Skeleton, Stack } from "@mui/material";
import GoBackButton from "components/common/GoBackButton";
import TextMd from "components/common/Text/TextMd";
import { ASSESSMENTS } from "constants/pages.routes";

interface Props {
  name: string;
}

const Header = ({ name }: Props) => {
  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        paddingTop: "2.31rem",
        gap: "1.38rem",
      }}
    >
      <GoBackButton text="Back to Assessments" url={ASSESSMENTS} />
      <Stack>
        {name ? (
          <TextMd text={`Share ${name}`} sx={{ fontWeight: "700" }} />
        ) : (
          <Skeleton sx={{ width: "15rem", height: "1.7rem" }} />
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
