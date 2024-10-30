import { Stack, TableCell, TableRow } from "@mui/material";
import EditTextField from "components/common/Input/EditTextField";
import TextXs from "components/common/Text/TextXs";
import { LoadingDarkIcon } from "constants/images.routes";
import Image from "next/image";
import { isLimitedDecimal } from "utils/maths";

interface Props {
  title: string;
  percentage: string;
  colSpan: number;
  index: number;
  isEdit?: boolean;
  isNew?: boolean;
  isLoading: boolean;
  handleChangePercentage: (value: string, index: number) => void;
  handleDoubleClickPercentage: (index: number) => void;
  handleClickAwayPercentage: (index: number) => void;
  handleSaveHolding: (index: number, isNew?: boolean) => void;
}

const TickerCashRow = ({
  percentage,
  colSpan,
  title,
  index,
  isEdit,
  isNew,
  handleChangePercentage,
  isLoading,
  handleDoubleClickPercentage,
  handleClickAwayPercentage,
  handleSaveHolding,
}: Props) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell colSpan={colSpan} sx={{ fontSize: "0.8125rem" }}>
        {title}
      </TableCell>
      <TableCell
        onDoubleClick={() => handleDoubleClickPercentage(index)}
        sx={{
          color: "var(--text-secondary)",
          fontSize: "0.8125rem",
          width: "20%",
        }}
      >
        <EditTextField
          autoFocus={false}
          sx={{ width: "5rem" }}
          type="number"
          value={percentage}
          placeholder={"0"}
          onChange={(e) => {
            if (isLimitedDecimal(e.target.value)) {
              handleChangePercentage(e.target.value, index);
            }
          }}
          onPressEnter={(e) => {
            if (e.key === "Enter") {
              handleSaveHolding(index, isNew);
            }
          }}
          endAdornment={
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <TextXs text="%" sx={{ color: "var(--text-primary)" }} />
              {isLoading && (
                <Image
                  className={"rotating"}
                  priority
                  src={LoadingDarkIcon}
                  alt={"icon"}
                  width={14}
                  height={14}
                />
              )}
            </Stack>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default TickerCashRow;
