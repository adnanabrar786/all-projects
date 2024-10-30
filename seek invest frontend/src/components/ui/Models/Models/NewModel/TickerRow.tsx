import { ClickAwayListener, Stack, TableCell, TableRow } from "@mui/material";
import EditTextField from "components/common/Input/EditTextField";
import TextXs from "components/common/Text/TextXs";
import { LoadingDarkIcon, XCircleIcon } from "constants/images.routes";
import Image from "next/image";
import { useState } from "react";
import { isLimitedDecimal } from "utils/maths";

interface Props {
  ticker: string;
  description: string;
  percentageValue: string;
  index: number;
  isEdit?: boolean;
  isNew?: boolean;
  isLoading: boolean;
  handleChangePercentage: (value: string, index: number) => void;
  handleDoubleClickPercentage: (index: number) => void;
  handleClickAwayPercentage: (index: number) => void;
  handleSaveHolding: (index: number, isNew?: boolean) => void;
  handleDeleteTicker: (value: string) => void;
}

const TickerRow = ({
  ticker,
  description,
  percentageValue,
  index,
  isEdit,
  isNew,
  handleChangePercentage,
  isLoading,
  handleDoubleClickPercentage,
  handleClickAwayPercentage,
  handleSaveHolding,
  handleDeleteTicker,
}: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpenMenu(false);
      }}
    >
      <TableRow
        sx={{
          alignItems: "center",
          cursor: "pointer",
          "&:last-child td, &:last-child th": { border: 0 },
          ".MuiTableCell-root": {
            fontSize: "0.8125rem",
            lineHeight: "1.25rem",
            color: "var(--text-secondary)",
          },
        }}
      >
        <TableCell
          sx={{
            color: "var(--text-primary) !important",
            fontWeight: "500 !important",
            width: "40%",
          }}
        >
          {ticker}
        </TableCell>
        <TableCell sx={{ width: "30%" }}>{description}</TableCell>
        <TableCell
          onDoubleClick={() => handleDoubleClickPercentage(index)}
          sx={{ width: "20%" }}
        >
          <EditTextField
            type="number"
            value={percentageValue}
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
            sx={{ width: "5rem" }}
          />
        </TableCell>
        <TableCell
          onClick={(e) => handleDeleteTicker(ticker)}
          sx={{
            img: {
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <Image
            width={16}
            height={16}
            priority
            src={XCircleIcon}
            alt={"icon"}
          />
        </TableCell>
      </TableRow>
    </ClickAwayListener>
  );
};

export default TickerRow;
