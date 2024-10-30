import { Stack, TableCell, TableRow } from "@mui/material";
import NAValuesIcon from "components/common/NAValuesIcon";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXs from "components/common/Text/TextXs";
import { ETopicType } from "enums/enums";
import { IKeyAreas } from "interfaces/client";
import Image from "next/image";
import { normalizeProgressValue } from "utils/maths";
import { getTopicNull, getValueAlignmentBg } from "utils/valueAlignment";

const { PRODUCT, NON_PRODUCT } = ETopicType;

interface Props {
  result: IKeyAreas;
  resultLength: number;
  index: number;
  keyAreasSection?: boolean;
  viewReport?: boolean;
  label?: string;
}

const KeyAreasRow = ({
  result,
  resultLength,
  index,
  keyAreasSection,
  viewReport,
  label,
}: Props) => {
  const value = result.values_alignment.value_score;
  const status_label = result.values_alignment.status_label;

  const isTopicNull = getTopicNull({
    type: result.type,
    preference: result.preference,
    value,
  });

  if (keyAreasSection && isTopicNull) {
    return <></>;
  }

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
          noWrap
          sx={{
            width: "10.5rem",
            lineHeight: "1.25rem",
            fontWeight: "500",
            fontSize: "0.75rem",
          }}
          text={result.topic_name}
        />
      </TableCell>

      <TableCell>
        <Stack sx={{ ml: "1.4rem" }}>
          <Image
            priority
            src={result.preference_icon}
            alt={"icon"}
            width={20}
            height={20}
          />
        </Stack>
      </TableCell>

      <TableCell>
        {result.importance > 0 && (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CustomizedProgressBars
              value={result.importance}
              sx={{
                backgroundColor: "var(--primary)",
                height: "0.5rem",
              }}
            />
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                color: "var(--text-primary)",
                fontWeight: "500",
              }}
              text={`${normalizeProgressValue(result.importance, true)}`}
            />
          </Stack>
        )}
      </TableCell>

      {viewReport && label === "fund" && (
        <TableCell>
          <TextXs
            noWrap
            sx={{
              lineHeight: "1.25rem",
              fontWeight: "500",
              fontSize: "0.75rem",
              textAlign: "center",
            }}
            text={
              result.product_exposure === null
                ? "N/A"
                : `${(result.product_exposure * 100).toFixed(2)}%`
            }
          />
        </TableCell>
      )}

      {value === 0 || value ? (
        <TableCell
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isTopicNull ? (
            <NAValuesIcon
              title={"Insufficient data available to generate score."}
              text="N/A"
            />
          ) : (
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
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
                text={`${value}`}
              />
            </Stack>
          )}
        </TableCell>
      ) : (
        <TableCell
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
        </TableCell>
      )}
    </TableRow>
  );
};

export default KeyAreasRow;
