import { Stack, TableCell, TableRow } from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXs from "components/common/Text/TextXs";
import { IHoldingReportSectorExposure } from "interfaces/client";

interface Props {
  index: number;
  resultLength: number;
  result: IHoldingReportSectorExposure;
}

const SectorExposureRow = ({ index, resultLength, result }: Props) => {
  return (
    <TableRow
      sx={{
        ".MuiTableCell-root": {
          padding: "1rem",
          borderBottom:
            resultLength - 1 != index ? "1px solid var(--gray-200)" : "none",

          ">p": {
            fontSize: "0.75rem",
          },
        },
      }}
    >
      <TableCell>
        <TextXs
          noWrap
          sx={{
            fontWeight: "500",
          }}
          text={result.sector}
        />
      </TableCell>

      <TableCell>
        {result.portfolio_exposure && (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CustomizedProgressBars
              normailize={false}
              value={Number(result.portfolio_exposure.replaceAll("%", ""))}
              sx={{
                backgroundColor: "var(--dark-orange)",
                height: "0.5rem",
              }}
            />
            <TextXs text={`${result.portfolio_exposure}`} />
          </Stack>
        )}
      </TableCell>

      <TableCell>
        {result.benchmark_exposure && (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CustomizedProgressBars
              normailize={false}
              value={Number(result.benchmark_exposure.replaceAll("%", ""))}
              sx={{
                backgroundColor: "var(--dark-orange)",
                height: "0.5rem",
              }}
            />
            <TextXs text={`${result.benchmark_exposure}`} />
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SectorExposureRow;
