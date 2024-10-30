import { Skeleton, Stack, Typography } from "@mui/material";
import HintText from "components/common/HintText";
import TextXs from "components/common/Text/TextXs";

interface Props {
  title: string;
  subTitle: string;
  status?: string;
  spanText?: string;
  isLoading: boolean;
}

const OverviewCard = ({
  title,
  subTitle,
  status,
  spanText,
  isLoading,
}: Props) => {
  return (
    <Stack
      sx={{
        padding: "1rem 0.63rem",
        paddingBottom: "0",
        border: "1px solid var(--color-border-border, #D0D5DD)",
        borderRadius: "0.5rem",
        minHeight: "7.69rem",
        height: "100%",
      }}
    >
      <TextXs
        text={title}
        sx={{ fontSize: "0.75rem", fontWeight: "700", lineHeight: "1.125rem" }}
      />
      {isLoading ? (
        <Skeleton width={"5rem"} />
      ) : (
        <Typography
          sx={{
            paddingTop: "0.5rem",
            color: "var(--text-primary)",
            fontWeight: "700",
            fontSize: "1.5rem",
            lineHeight: "2rem",
            span: {
              marginLeft: "0.25rem",
              fontWeight: "400",
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
            },
          }}
        >
          {subTitle}
          {spanText && <span>{spanText}</span>}
        </Typography>
      )}

      {status &&
        (isLoading ? (
          <Skeleton width={"5rem"} />
        ) : (
          <HintText
            text={status}
            sx={{
              paddingTop: "1.81rem",
              color:
                status === "Active"
                  ? "var(--text-success)"
                  : "var(--text-secondary)",
            }}
          />
        ))}
    </Stack>
  );
};

export default OverviewCard;
