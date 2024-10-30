import { Stack, TableCell, TableRow } from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";
import { normalizeProgressValue } from "utils/maths";

interface Props {
  result: any;
  resultLength: number;
  index: number;
}

const ValuesResultRow = ({ result, resultLength, index }) => {
  return (
    <TableRow
      sx={{
        ".MuiTableCell-root": {
          borderBottom:
            resultLength - 1 != index ? "1px solid var(--gray-300)" : "none",
        },
      }}
    >
      <TableCell>
        <TextXs
          sx={{
            fontSize: "0.8125rem",
            fontWeight: "400",
            lineHeight: "1.25rem",
            fontStyle: "normal",
            color: "var(--text-primary)",
            ml: "1rem",
          }}
          text={`${index + 1}`}
        />
      </TableCell>

      <TableCell>
        <TextXs
          sx={{
            lineHeight: "1.25rem",
          }}
          text={result.topic}
        />
      </TableCell>

      <TableCell>
        <Stack
          direction={"row"}
          sx={{
            gap: "0.44rem",
            alignContent: "center",
          }}
        >
          <Image
            priority
            src={result.icon}
            alt={"icon"}
            width={20}
            height={20}
          />

          <TextXs
            sx={{
              lineHeight: "1.25rem",
              color: "var(--text-primary)",
            }}
            text={`I will ${result.preference} this topic`}
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
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                color: "var(--text-primary)",
              }}
              text={`${normalizeProgressValue(result.importance)}`}
            />
            <CustomizedProgressBars
              value={result.importance}
              sx={{
                backgroundColor: "var(--black)",
                height: "0.2rem",
              }}
            />
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ValuesResultRow;
