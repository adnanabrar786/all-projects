import { Box, ClickAwayListener, TableCell, TableRow } from "@mui/material";
import EditTextField from "components/common/Input/EditTextField";
import TextXs from "components/common/Text/TextXs";
import { LoadingDarkIcon } from "constants/images.routes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { invertFormattedNumber } from "utils/maths";

interface Props {
  amount: string;
  percentageValue: string;
  index: number;
  description?: string;
  isEdit?: boolean;
  handleChangeAmount: (value: string, index: number) => void;
  handleSaveHolding: (index: number, isNew?: boolean) => void;
  handleDoubleClickAmount: (index: number) => void;
  handleClickAwayAmount: (index: number, oldAmount: string) => void;
  isSelected?: boolean;
  onClick: () => void;
}

const HoldingCashRow = ({
  amount,
  percentageValue,
  index,
  handleDoubleClickAmount,
  handleClickAwayAmount,
  handleChangeAmount,
  handleSaveHolding,
  isEdit,
  onClick,
  isSelected,
}: Props) => {
  const [oldAmount, setOldAmount] = useState(amount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOldAmount(amount);
  }, [isEdit]);

  return (
    <TableRow
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: isSelected ? "var(--lightest-blue-opa)" : "",
        "&:not(:last-child)": {
          backgroundColor: isSelected ? "var(--lightest-blue-opa)" : "",
        },
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
      <TableCell colSpan={2}>
        <TextXs
          sx={{
            fontWeight: "500",
            lineHeight: "1.25rem",
            fontSize: "0.75rem",
          }}
          text={"Cash and other non-scorable items"}
        />
      </TableCell>
      <TableCell
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={() => handleDoubleClickAmount(index)}
      >
        {!isEdit ? (
          <TextXs
            sx={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
            text={`$${amount}`}
          />
        ) : (
          <ClickAwayListener
            onClickAway={() => {
              handleClickAwayAmount(index, oldAmount);
            }}
          >
            <Box>
              <EditTextField
                type="number"
                value={`${Number(invertFormattedNumber(amount))}`}
                placeholder={"Amount"}
                onChange={(e) => {
                  handleChangeAmount(e.target.value, index);
                }}
                onPressEnter={async (e) => {
                  if (e.key === "Enter" && !isLoading) {
                    setIsLoading(true);
                    await handleSaveHolding(index);
                    setIsLoading(false);
                  }
                }}
                startAdornment={
                  <TextXs text="$" sx={{ color: "var(--text-primary)" }} />
                }
                endAdornment={
                  isLoading && (
                    <Image
                      className={"rotating"}
                      priority
                      src={LoadingDarkIcon}
                      alt={"icon"}
                      width={14}
                      height={14}
                    />
                  )
                }
              />
            </Box>
          </ClickAwayListener>
        )}
      </TableCell>
      <TableCell>
        <TextXs
          sx={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
          text={`${percentageValue}%`}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default HoldingCashRow;
