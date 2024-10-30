import {
  Box,
  ClickAwayListener,
  ListItemButton,
  Stack,
  SxProps,
  TableCell,
  TableRow,
} from "@mui/material";
import MenuCard from "components/common/Card/MenuCard";
import EditTextField from "components/common/Input/EditTextField";
import NAValuesIcon from "components/common/NAValuesIcon";
import TextXs from "components/common/Text/TextXs";
import HoldingFlagRow from "components/ui/clients/ClientDetails/Accounts/HoldingFlagRow";
import { COPY_TO_JSON } from "constants/environment";
import {
  ComparisonIcon,
  CopyIcon,
  CrossRedRoundIcon,
  DocumentIcon,
  DotsVerticalIcon,
  LoadingDarkIcon,
} from "constants/images.routes";
import { ETickerType } from "enums/assessment";
import { ALIGNMENTS_SCORE_LABEL } from "enums/enums";
import { IAccountValuesAlignment, IProductExposure } from "interfaces/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { invertFormattedNumber, isLimitedDecimal } from "utils/maths";
import { getValueAlignmentBg } from "utils/valueAlignment";

const { FUND } = ETickerType;

interface Props {
  holding: string;
  amount: string;
  percentageValue: string;
  index: number;
  riskScore: number | null;
  valueAlignment: {
    value_score: number;
    value_status: ALIGNMENTS_SCORE_LABEL;
  } | null;
  description?: string;
  sxRow?: SxProps;
  sxName?: SxProps;
  isEdit?: boolean;
  showValuesAlignment: boolean;
  isNew?: boolean;
  handleChangeAmount: (value: string, index: number) => void;
  handleSaveHolding: (index: number, isNew?: boolean) => void;
  handleDoubleClickAmount: (index: number) => void;
  handleClickAwayAmount: (index: number, oldAmount: string) => void;
  isSelected?: boolean;
  score: number;
  isDeleting: boolean;
  isCopyingJson: boolean;
  handleDeleteTicker: () => void;
  handleCopyToJson: () => void;
  product_exposure: IProductExposure[];
  setHoldingReport: () => void;
  accountsValueAlignment: IAccountValuesAlignment | null;
  setOpenComparisonReport: () => void;
  label?: string;
}

const HoldingRow = ({
  holding,
  amount,
  percentageValue,
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
  isSelected,
  handleDeleteTicker,
  handleCopyToJson,
  isDeleting,
  isCopyingJson,
  riskScore,
  valueAlignment,
  showValuesAlignment,
  product_exposure,
  setHoldingReport,
  accountsValueAlignment,
  setOpenComparisonReport,
  label,
}: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [oldAmount, setOldAmount] = useState(amount);

  useEffect(() => {
    setOldAmount(amount);
  }, [isEdit]);

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setOpenMenu(false);
        }}
      >
        <TableRow
          sx={{
            backgroundColor: isSelected ? "var(--lightest-blue-opa)" : "",
            "&:not(:last-child)": {
              backgroundColor: isSelected ? "var(--lightest-blue-opa)" : "",
            },
            alignItems: "center",
            cursor: "pointer",
            "&:last-child td, &:last-child th": { border: 0 },
            ".MuiTableCell-root": {
              fontSize: "0.75rem",
              lineHeight: "1.25rem",
              color: "var(--text-secondary)",
              borderBottom: product_exposure.length
                ? "none"
                : "1px solid var(--gray-200)",
            },
            ...sxRow,
          }}
        >
          <TableCell>
            <TextXs
              sx={{
                color: "var(--text-primary)",
                fontSize: "0.75rem",
                fontWeight: "500",
                ...sxName,
              }}
              text={holding}
            />
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
                  fontSize: "0.75rem",
                }}
                text={description || ""}
              />
            </Stack>
          </TableCell>

          <TableCell
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={() => handleDoubleClickAmount(index)}
            sx={{ width: "8rem" }}
          >
            {!isEdit ? (
              <TextXs
                sx={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
                text={amount ? `$${amount}` : "$0"}
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
                    value={
                      isNew
                        ? amount
                        : `${Number(invertFormattedNumber(amount))}`
                    }
                    placeholder={"Amount"}
                    onChange={(e) => {
                      if (isLimitedDecimal(e.target.value)) {
                        handleChangeAmount(e.target.value, index);
                      }
                    }}
                    onPressEnter={async (e) => {
                      if (e.key === "Enter" && !isLoading) {
                        setIsLoading(true);
                        await handleSaveHolding(index, isNew);
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

          <TableCell>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {riskScore !== null ? (
                <TextXs
                  sx={{
                    bgcolor: "var(--ghost-white)",
                    borderRadius: "50%",
                    width: "2rem",
                    height: "2rem",
                    lineHeight: "2rem",
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                  }}
                  text={`${riskScore}`}
                />
              ) : (
                <NAValuesIcon
                  title="Insufficient data available to display score"
                  text="N/A"
                />
              )}
            </Stack>
          </TableCell>

          <TableCell>
            {showValuesAlignment &&
              accountsValueAlignment &&
              accountsValueAlignment.values_alignment.label !== "N/A" && (
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {valueAlignment && valueAlignment.value_score != null ? (
                    <TextXs
                      sx={{
                        bgcolor: getValueAlignmentBg(
                          valueAlignment.value_status
                        )?.backgroundColor,
                        color: getValueAlignmentBg(valueAlignment.value_status)
                          ?.color,
                        minWidth: "2rem",
                        minHeight: "2rem",
                        borderRadius: "50%",
                        lineHeight: "2rem",
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: "0.75rem",
                      }}
                      text={`${valueAlignment.value_score}`}
                    />
                  ) : (
                    <NAValuesIcon
                      title="Insufficient data available to generate score."
                      text="N/A"
                    />
                  )}
                </Stack>
              )}
          </TableCell>

          <TableCell sx={{ width: "2rem" }}>
            {!isNew && (
              <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                <Box
                  sx={{
                    position: "relative",
                    width: "1rem",
                    height: "1rem",
                  }}
                >
                  {openMenu ? (
                    <MenuCard sx={{ minWidth: "12rem" }}>
                      {accountsValueAlignment &&
                        accountsValueAlignment.values_alignment.label !==
                          "N/A" && (
                          <ListItemButton
                            onClick={setHoldingReport}
                            sx={{
                              gap: "0.5rem",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              width={16}
                              height={16}
                              priority
                              src={DocumentIcon}
                              alt={"icon"}
                            />
                            <TextXs
                              text="View Report"
                              sx={{
                                lineHeight: "100%",
                              }}
                            />
                          </ListItemButton>
                        )}

                      {label == FUND && (
                        <ListItemButton
                          onClick={() => {
                            setOpenComparisonReport();
                            setOpenMenu(false);
                          }}
                          sx={{
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            width={16}
                            height={16}
                            priority
                            src={ComparisonIcon}
                            alt={"icon"}
                          />
                          <TextXs
                            text="Comparison Report"
                            sx={{
                              lineHeight: "100%",
                            }}
                          />
                        </ListItemButton>
                      )}

                      {COPY_TO_JSON && (
                        <ListItemButton
                          onClick={async (e) => {
                            e.stopPropagation();
                            await handleCopyToJson();
                            setOpenMenu(false);
                          }}
                          sx={{
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          {isCopyingJson ? (
                            <Image
                              className={"rotating"}
                              priority
                              src={LoadingDarkIcon}
                              alt={"icon"}
                              width={16}
                              height={16}
                            />
                          ) : (
                            <Image
                              width={16}
                              height={16}
                              priority
                              src={CopyIcon}
                              alt={"icon"}
                            />
                          )}
                          <TextXs text="Copy to Json" />
                        </ListItemButton>
                      )}

                      <ListItemButton
                        onClick={async (e) => {
                          e.stopPropagation();
                          await handleDeleteTicker();
                          setOpenMenu(false);
                        }}
                        sx={{
                          gap: "0.5rem",
                          alignItems: "center",
                          borderTop: "1px solid var(--gray-100)",
                        }}
                      >
                        {isDeleting ? (
                          <Image
                            className={"rotating"}
                            priority
                            src={LoadingDarkIcon}
                            alt={"icon"}
                            width={16}
                            height={16}
                          />
                        ) : (
                          <Image
                            width={16}
                            height={16}
                            priority
                            src={CrossRedRoundIcon}
                            alt={"icon"}
                          />
                        )}
                        <TextXs
                          text="Delete"
                          sx={{
                            color: "var(--carnelian-light)",
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
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  />
                </Box>
              </ClickAwayListener>
            )}
          </TableCell>
        </TableRow>
      </ClickAwayListener>

      {product_exposure.length ? (
        product_exposure.map((result, i) => (
          <HoldingFlagRow
            key={i}
            index={i}
            rowsLength={product_exposure.length}
            result={result}
            tickerName={holding}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default HoldingRow;
