import { Skeleton, Stack } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import useClientByIdData from "hooks/useClientByIdData";

const TotalAccountValue = () => {
  const { client } = useClientByIdData();
  return (
    <Stack sx={{ gap: "0.25rem" }}>
      <TextXs
        text="Total Account Value"
        sx={{ fontSize: "0.75rem", lineHeight: "1.125rem" }}
      />

      {client ? (
        <TextSm
          text={client.aum ? `$${client.aum}` : `$0.00`}
          sx={{
            fontSize: "1rem",
            fontWeight: "600",
            lineHeight: "2.375rem",
            color:
              client && client.aum
                ? "var(--text-primary)"
                : "var(--border-color)",
          }}
        />
      ) : (
        <Skeleton width={"5rem"} height={"2rem"} />
      )}
    </Stack>
  );
};

export default TotalAccountValue;
