import {
  Box,
  ClickAwayListener,
  ListItemButton,
  Stack,
  SxProps,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import MenuCard from "components/common/Card/MenuCard";
import EditTextField from "components/common/Input/EditTextField";
import TextXs from "components/common/Text/TextXs";
import {
  AlertIcon,
  CheckCircleGreen,
  CrossGrey600Icon,
  DotsVerticalIcon,
  LoadingDarkIcon,
  YellowFlag,
} from "constants/images.routes";
import { IProductWeights } from "interfaces/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  holding: string;
  amount: string;
  percentageValue: string;
  index: number;
  description?: string;
  sxRow?: SxProps;
  sxName?: SxProps;
  isEdit?: boolean;
  isNew?: boolean;
  handleChangeAmount: (value: string, index: number) => void;
  handleSaveHolding: (index: number, isNew?: boolean) => void;
  handleDoubleClickAmount: (index: number) => void;
  handleClickAwayAmount: (index: number, oldAmount: number) => void;
  isLoading: boolean;
  isSelected?: boolean;
  isFlag: boolean;
  onClick: () => void;
  score: number;
  handleDeleteTicker: () => void;
  product_weights: IProductWeights[];
}

const HoldingRow = ({
  holding,
  amount,
  percentageValue,
  score,
  index,
  description,
  sxRow,
  sxName,
  isEdit,
  isNew,
  handleChangeAmount,
  handleSaveHolding,
  handleDoubleClickAmount,
  handleClickAwayAmount,
  isLoading,
  onClick,
  isSelected,
  handleDeleteTicker,
  isFlag,
  product_weights,
}: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [flagMenu, setFlagMenu] = useState(false);

  const [oldAmount, setOldAmount] = useState(parseInt(amount));

  useEffect(() => {
    setOldAmount(parseInt(amount));
  }, [isEdit]);

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setOpenMenu(false);
          if (!isSelected) {
            setFlagMenu(false);
          }
        }}
      >
        <TableRow
          onClick={() => {
            if (isFlag) {
              setFlagMenu(!flagMenu);
            }

            onClick();
          }}
          sx={{
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
              paddingY: "0.7rem",
              color: "var(--text-secondary)",
              borderBottom:
                product_weights.length && flagMenu
                  ? "none"
                  : "1px solid var(--gray-300)",
            },
            ...sxRow,
          }}
        >
          <TableCell
            sx={{
              color: "var(--text-primary) !important",
              fontWeight: "500 !important",
              ...sxName,
            }}
          >
            <Stack
              sx={{
                backgroundColor: "var(--light-primary2)",
                borderRadius: "0.125rem",
              }}
            >
              <TextXs
                sx={{
                  margin: "0.31rem 0.16rem",
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                  fontWeight: "700",
                  lineHeight: "100%",
                  borderRadius: "0.125rem",
                  textAlign: "center",
                }}
                text={score.toFixed()}
              />
            </Stack>
          </TableCell>

          <TableCell
            sx={{
              color: "var(--text-primary) !important",
              fontWeight: "500 !important",
              ...sxName,
            }}
          >
            {holding}
          </TableCell>
          <TableCell>
            <Stack
              direction={"row"}
              sx={{
                width: "10rem",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <TextXs
                sx={{
                  color: "var(--text-primary)",
                  lineHeight: "1.25rem",
                }}
                text={description || ""}
              />
              {isFlag && (
                <Image
                  priority
                  src={YellowFlag}
                  alt={"icon"}
                  width={14}
                  height={14}
                />
              )}
            </Stack>
          </TableCell>

          <TableCell
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={() => handleDoubleClickAmount(index)}
            sx={{ width: "8rem" }}
          >
            {!isEdit ? (
              amount ? (
                `$${parseInt(amount).toLocaleString()}`
              ) : (
                "$0"
              )
            ) : (
              <ClickAwayListener
                onClickAway={() => {
                  handleClickAwayAmount(index, oldAmount);
                }}
              >
                <Box>
                  <EditTextField
                    type="number"
                    value={amount}
                    placeholder={"Amount"}
                    onChange={(e) => {
                      handleChangeAmount(e.target.value, index);
                    }}
                    onPressEnter={(e) => {
                      if (e.key === "Enter") {
                        handleSaveHolding(index, isNew);
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

          <TableCell sx={{ width: "8rem" }}>{percentageValue}%</TableCell>

          <TableCell sx={{ width: "2rem" }}>
            <Box
              sx={{
                position: "relative",
                width: "1rem",
                height: "1rem",
              }}
            >
              {openMenu ? (
                <MenuCard sx={{ minWidth: "12rem" }}>
                  <ListItemButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTicker();
                      setOpenMenu(false);
                    }}
                    sx={{
                      gap: "0.5rem",
                    }}
                  >
                    <Image
                      width={14}
                      height={14}
                      priority
                      src={CrossGrey600Icon}
                      alt={"icon"}
                    />
                    <TextXs
                      text="Remove"
                      sx={{
                        color: "var(--text-primary)",
                        lineHeight: "100%",
                      }}
                    />
                  </ListItemButton>
                </MenuCard>
              ) : null}

              <Image
                priority
                src={DotsVerticalIcon}
                alt={"icon"}
                fill
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(!openMenu);
                }}
              />
            </Box>
          </TableCell>
        </TableRow>
      </ClickAwayListener>

      {flagMenu && (
        <TableRow>
          <TableCell
            sx={{
              padding: "0",
              border: "none",
            }}
            colSpan={6}
          >
            {product_weights.map((product_weight, index) => (
              <Stack
                key={index}
                direction={"row"}
                sx={{
                  color: product_weight.is_opposed
                    ? "var(--plochere)"
                    : "var(--green)",
                  backgroundColor: product_weight.is_opposed
                    ? "var(--red-shadwow)"
                    : "var(--background-color)",
                  padding: "0.34rem 0.5rem",
                  borderTop: product_weight.is_opposed
                    ? "1px solid var(--light-salmon-pink)"
                    : "1px solid var(--crayola)",
                  gap: "0.12rem",
                  alignItems: "center",
                }}
              >
                {product_weight.is_opposed ? (
                  <Image
                    priority
                    src={AlertIcon}
                    alt={"icon"}
                    width={16}
                    height={17}
                  />
                ) : (
                  <Image
                    priority
                    src={CheckCircleGreen}
                    alt={"icon"}
                    width={16}
                    height={17}
                  />
                )}
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    span: {
                      color: product_weight.is_opposed
                        ? "var(--plochere)"
                        : "var(--green)",
                    },
                    ".span1": {
                      fontWeight: "700",
                    },
                    ".span2": {
                      fontWeight: "600",
                    },
                  }}
                >
                  <span className="span1">
                    {Math.round(product_weight.product_coverage_ratio * 100)}%
                  </span>{" "}
                  exposure to{" "}
                  <span className="span1">
                    {product_weight.ProductTopicCode}
                  </span>{" "}
                  in <span className="span2"> {holding}</span>
                </Typography>
              </Stack>
            ))}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default HoldingRow;
