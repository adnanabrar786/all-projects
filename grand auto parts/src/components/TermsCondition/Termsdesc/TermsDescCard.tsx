import Termsdesc from "@/components/TermsCondition/Termsdesc/index";
import { Stack, SxProps } from "@mui/system";

interface Props {
  data: string[];
  sxTitle?: SxProps;
  sxContainer?: SxProps;
}

const TermsDescCard = ({ sxContainer, sxTitle, data }: Props) => {
  return (
    <Stack
      direction={"column"}
      sx={{
        marginTop: "18.3px",
        display: "flex",
        gap: "25px",
        ...sxContainer,
      }}
    >
      {data.map((terms, index) => (
        <Stack key={index}>
          <Termsdesc desc={terms} />
        </Stack>
      ))}
    </Stack>
  );
};

export default TermsDescCard;
