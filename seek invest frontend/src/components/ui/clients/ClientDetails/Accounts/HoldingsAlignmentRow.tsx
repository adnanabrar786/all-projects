import { Stack, TableCell, TableRow } from "@mui/material";
import NAValuesIcon from "components/common/NAValuesIcon";
import TextXs from "components/common/Text/TextXs";
import { IHoldingTopHoldingsAlignment } from "interfaces/client";
import { getValueAlignmentBg } from "utils/valueAlignment";

interface Props {
  result: IHoldingTopHoldingsAlignment;
  resultLength: number;
  index: number;
}

const HoldingsAlignmentRow = ({ result, resultLength, index }: Props) => {
  const value = result.values_alignment.value_score;
  const status_label = result.values_alignment.status_label;

  return (
    <TableRow
      sx={{
        ".MuiTableCell-root": {
          padding: "0.63rem",
          pr: "0.5rem",
          borderBottom:
            resultLength - 1 != index ? "1px solid var(--gray-200)" : "none",
        },
      }}
    >
      <TableCell>
        <TextXs
          sx={{
            fontWeight: "500",
            fontSize: "0.75rem",
          }}
          text={result.ticker}
        />
      </TableCell>

      <TableCell colSpan={2}>
        <TextXs
          sx={{
            color: "var(--text-primary)",
          }}
          text={`${result.name}`}
        />
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            color: "var(--text-primary)",
            textAlign: "center",
          }}
          text={`${result.weight}%`}
        />
      </TableCell>

      <TableCell>
        {result.risk_score !== null ? (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextXs
              sx={{
                bgcolor: "var(--ghost-white)",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                lineHeight: "2rem",
                textAlign: "center",
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
              }}
              text={`${result.risk_score}`}
            />
          </Stack>
        ) : (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NAValuesIcon
              title="Insufficient data available to display score"
              text="N/A"
            />
          </Stack>
        )}
      </TableCell>

      {value === 0 || value ? (
        <TableCell>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextXs
              sx={{
                bgcolor: getValueAlignmentBg(status_label)?.backgroundColor,
                color: getValueAlignmentBg(status_label)?.color,
                minWidth: "2rem",
                minHeight: "2rem",
                borderRadius: "50%",
                lineHeight: "2rem",
                textAlign: "center",
              }}
              text={`${value}`}
            />
          </Stack>
        </TableCell>
      ) : (
        <TableCell>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NAValuesIcon
              title="Insufficient data available to generate score."
              text="N/A"
            />
          </Stack>
        </TableCell>
      )}
    </TableRow>
  );
};

export default HoldingsAlignmentRow;
