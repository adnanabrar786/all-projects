import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import Chip from "components/common/Chip/Chip";
import DialogLoader from "components/common/DialogLoader";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import TextMd from "components/common/Text/TextMd";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import {
  CrossGrey500Icon,
  ExportPDFIcon,
  LoadingDarkIcon,
} from "constants/images.routes";
import { ALIGNMENTS_SCORE_LABEL } from "enums/enums";
import useClientByIdData from "hooks/useClientByIdData";
import useHoldingReportData from "hooks/useHoldingReportData";

import HoldingFlagExposure from "components/ui/clients/ClientDetails/Accounts/HoldingFlagExposure";
import HoldingReportPDF from "components/ui/clients/ClientDetails/Accounts/HoldingReportPDF";
import HoldingsAlignmentHead from "components/ui/clients/ClientDetails/Accounts/HoldingsAlignmentHead";
import HoldingsAlignmentRow from "components/ui/clients/ClientDetails/Accounts/HoldingsAlignmentRow";
import KeyAreasRow from "components/ui/clients/ClientDetails/Accounts/KeyAreasRow";
import PerformanceDataHead from "components/ui/clients/ClientDetails/Accounts/PerformanceDataHead";
import PerformanceDataRow from "components/ui/clients/ClientDetails/Accounts/PerformanceDataRow";
import SectorExposureHead from "components/ui/clients/ClientDetails/Accounts/SectorExposureHead";
import SectorExposureRow from "components/ui/clients/ClientDetails/Accounts/SectorExposureRow";
import ValuesAlignmentHead from "components/ui/clients/ClientDetails/Accounts/ValuesAlignmentHead";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toastError } from "utils/toaster";
import { getValueAlignmentBg } from "utils/valueAlignment";

interface Props {
  holdingReport: string;
  accountId: string;
  setHoldingReport: (value: string | null) => void;
}

const HoldingReportModal = ({
  setHoldingReport,
  accountId,
  holdingReport,
}: Props) => {
  const { client } = useClientByIdData();
  const [downloadFile, setDownloadFile] = useState(false);
  const {
    holdingReport: holdingReportData,
    isLoading,
    error,
  } = useHoldingReportData(accountId, holdingReport);

  const riskValueScore =
    !isLoading && holdingReportData
      ? [
          {
            title: "Risk Score",
            value:
              holdingReportData.risk_score !== null
                ? holdingReportData.risk_score
                : "N/A",
            bg: "var(--ghost-white)",
            color: "var(text-primary)",
          },
          {
            title: "Values Alignment",
            value:
              holdingReportData.ticker_values_alignment !== null &&
              String(holdingReportData.ticker_values_alignment.value_score) !==
                ""
                ? holdingReportData.ticker_values_alignment.value_score
                : "N/A",
            bg:
              holdingReportData.ticker_values_alignment !== null &&
              String(holdingReportData.ticker_values_alignment.value_score) !==
                ""
                ? getValueAlignmentBg(
                    holdingReportData.ticker_values_alignment.status_label
                  )?.backgroundColor
                : "var(--ghost-white)",
            color:
              holdingReportData.ticker_values_alignment !== null &&
              String(holdingReportData.ticker_values_alignment.value_score) !==
                ""
                ? getValueAlignmentBg(
                    holdingReportData.ticker_values_alignment.status_label
                  )?.color
                : "var(text-primary)",
          },
        ]
      : [];

  const riskStatistics =
    !isLoading && holdingReportData ? holdingReportData.risk_statistics : [];

  const [instance, updateInstance] = usePDF();

  useEffect(() => {
    if (error) {
      setHoldingReport(null);
      if (error.message) {
        toastError(error.message);
      }
    }
  }, [error]);

  const handleDownloadPDF = async () => {
    if (holdingReportData && client) {
      updateInstance(
        <HoldingReportPDF
          performanceData={holdingReportData.performance_data}
          riskStatistics={riskStatistics}
          sectorExposure={holdingReportData.sector_exposure}
          regionalExposure={holdingReportData.regional_exposure}
          valuesAlignments={holdingReportData.values_alignment}
          product_exposure={holdingReportData.product_exposure}
          topHoldingsAlignment={holdingReportData.top_holdings_alignment}
          ticker={holdingReportData.ticker_name}
          label={holdingReportData.label}
          clientName={`${client.first_name} ${client.last_name}`}
          riskScore={holdingReportData.risk_score}
          valueScore={`${holdingReportData.ticker_values_alignment.value_score}`}
          valueStatus={
            holdingReportData.ticker_values_alignment
              .status_label as ALIGNMENTS_SCORE_LABEL
          }
          description={holdingReportData.description}
        />
      );

      setDownloadFile(true);
    }
  };

  useEffect(() => {
    if (instance.url && holdingReportData && downloadFile) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = `${holdingReportData.ticker_name}-holding-report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadFile(false);
    }
  }, [instance, downloadFile]);

  const is_performance_and_risk_statistics_empty =
    holdingReportData &&
    !holdingReportData.performance_data.length &&
    !holdingReportData.risk_statistics.length;

  return (
    <Dialog
      open
      fullWidth
      maxWidth={"lg"}
      onClose={() => setHoldingReport(null)}
    >
      <DialogTitle sx={{ padding: "0" }}>
        <Stack sx={{ padding: "1.5rem" }}>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack sx={{ gap: "0.25rem" }}>
              {!isLoading && holdingReportData && (
                <>
                  <Stack
                    direction={"row"}
                    sx={{ gap: "0.5rem", alignItems: "center" }}
                  >
                    <TextMd text={holdingReportData.ticker_name} />
                    <Chip
                      text={holdingReportData.label}
                      sx={{
                        fontWeight: "500",
                        textTransform: "capitalize",
                        color: holdingReportData.label_color,
                        backgroundColor:
                          holdingReportData.label_backgroundcolor,
                      }}
                    />
                  </Stack>

                  <TextSm text={holdingReportData.description} />
                </>
              )}
            </Stack>

            <Stack
              direction={"row"}
              sx={{ gap: "1.5rem", ".closeImg": { cursor: "pointer" } }}
            >
              {!isLoading && holdingReportData && (
                <Stack
                  direction={"row"}
                  sx={{ gap: "1rem", alignItems: "center" }}
                >
                  {riskValueScore.map((val, i) => (
                    <Stack
                      key={val.title}
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        gap: "0.75rem",
                        paddingX: "1rem",
                        border: "1px solid var(--gray-200)",
                        borderRadius: "0.5rem",
                        height: "3rem",
                      }}
                    >
                      <TextXs text={val.title} sx={{ fontSize: "0.75rem" }} />

                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TextXs
                          sx={{
                            bgcolor: val.bg,
                            color: val.color,
                            minWidth: "2rem",
                            minHeight: "2rem",
                            borderRadius: "50%",
                            lineHeight: "2rem",
                            textAlign: "center",
                            fontWeight: "500",
                            fontSize: "0.75rem",
                          }}
                          text={`${val.value}`}
                        />
                      </Stack>
                    </Stack>
                  ))}

                  <IconText
                    iconClassName={instance.loading ? "rotating" : ""}
                    onClick={handleDownloadPDF}
                    text="Export to PDF"
                    sxRow={{
                      cursor: "pointer",
                      gap: "0.75rem",
                      paddingX: "1rem",
                      border: "1px solid var(--gray-200)",
                      borderRadius: "0.5rem",
                      height: "3rem",
                    }}
                    icon={instance.loading ? LoadingDarkIcon : ExportPDFIcon}
                    iconWidth={16}
                    iconHeight={16}
                  />
                </Stack>
              )}

              <Image
                onClick={() => setHoldingReport(null)}
                className="closeImg"
                priority
                src={CrossGrey500Icon}
                alt={"icon"}
                width={20}
                height={20}
              />
            </Stack>
          </Stack>
        </Stack>

        {isLoading && <DialogLoader />}

        <CustomDivider />
      </DialogTitle>

      <DialogContent
        className="displayScrollBar"
        sx={{
          padding: "0",
        }}
      >
        {!isLoading && holdingReportData && (
          <Stack sx={{ paddingX: "1.5rem", pb: "1.5rem" }}>
            <Grid container columnSpacing={2} sx={{ mt: "2.5rem" }}>
              <Grid item xs={6}>
                {holdingReportData.performance_data.length ? (
                  <ClientSummaryCard
                    title={"Performance Data"}
                    sxContainer={{ boxShadow: "var(--light-box-shadow)" }}
                    sx={{ padding: "0" }}
                    sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
                  >
                    <TableContainer>
                      <Table sx={{ width: "100%" }} aria-label="simple table">
                        <PerformanceDataHead />

                        <TableBody>
                          {holdingReportData.performance_data.map(
                            (result, i) => (
                              <PerformanceDataRow
                                result={result}
                                resultLength={
                                  holdingReportData.performance_data.length
                                }
                                index={i}
                                key={i}
                              />
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ClientSummaryCard>
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item xs={6}>
                {holdingReportData.risk_statistics.length ? (
                  <ClientSummaryCard
                    title={"Risk Statistics"}
                    sxContainer={{ boxShadow: "var(--light-box-shadow)" }}
                    sx={{
                      padding: "0",
                      gap: "inherit",
                    }}
                    sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
                  >
                    {riskStatistics.map((val, i) => (
                      <Stack
                        key={i}
                        direction={"row"}
                        sx={{
                          width: "100%",
                          padding: "1rem 1.25rem",
                          boxSizing: "border-box",
                          justifyContent: "space-between",
                          borderBottom:
                            i !== riskStatistics.length - 1
                              ? "1px solid var(--gray-200)"
                              : "none",
                          ">p": {
                            fontSize: "0.75rem",
                          },
                        }}
                      >
                        {val.title && (
                          <TextXs text={val.title} sx={{ fontWeight: "500" }} />
                        )}
                        <TextXs text={val.value} />
                      </Stack>
                    ))}
                  </ClientSummaryCard>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>

            {holdingReportData.sector_exposure.length ? (
              <ClientSummaryCard
                title={"Sector Exposure"}
                sxContainer={{
                  mt: "2rem",
                  boxShadow: "var(--light-box-shadow)",
                }}
                sx={{
                  padding: "0",
                }}
                sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
              >
                <TableContainer>
                  <Table>
                    <SectorExposureHead
                      ticker={holdingReportData.ticker_name}
                      benchmarkExposureHeader={
                        holdingReportData.performance_data[1]
                          ? holdingReportData.performance_data[1]
                              .trailing_returns
                          : ""
                      }
                    />

                    <TableBody>
                      {holdingReportData.sector_exposure.map((result, i) => (
                        <SectorExposureRow
                          key={i}
                          index={i}
                          result={result}
                          resultLength={
                            holdingReportData.sector_exposure.length
                          }
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ClientSummaryCard>
            ) : (
              <></>
            )}

            {holdingReportData.regional_exposure.length ? (
              <ClientSummaryCard
                title={"Regional Exposure"}
                sxContainer={{
                  mt: "2rem",
                  boxShadow: "var(--light-box-shadow)",
                }}
                sx={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  minHeight: "0",
                  pb: "1.5rem",
                }}
                sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
                hideDivider
              >
                {holdingReportData.regional_exposure.map((val, i) => (
                  <Chip
                    key={val.region}
                    text={`${val.region} ${val.percentage}%`}
                    sx={{
                      color: "var(--text-tertiary)",
                      backgroundColor: "var(--gray-100)",
                    }}
                  />
                ))}
              </ClientSummaryCard>
            ) : (
              <></>
            )}

            {holdingReportData.values_alignment.length ? (
              <ClientSummaryCard
                title={"Values Alignment"}
                sx={{ padding: "0" }}
                sxContainer={{
                  mt: is_performance_and_risk_statistics_empty ? 0 : "2rem",
                  boxShadow: "var(--light-box-shadow)",
                }}
                sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
              >
                <TableContainer sx={{ overflow: "visible" }}>
                  <Table>
                    <ValuesAlignmentHead
                      viewReport
                      label={holdingReportData.label}
                    />

                    <TableBody>
                      {holdingReportData.values_alignment.map(
                        (result, index) => (
                          <KeyAreasRow
                            key={index}
                            result={result}
                            resultLength={
                              holdingReportData.values_alignment.length
                            }
                            index={index}
                            viewReport
                            label={holdingReportData.label}
                          />
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ClientSummaryCard>
            ) : (
              <></>
            )}

            {holdingReportData.product_exposure.length ? (
              <ClientSummaryCard
                title={"Product Exposure"}
                sxContainer={{
                  mt: "2rem",
                  boxShadow: "var(--light-box-shadow)",
                }}
                sx={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  minHeight: "0",
                  pb: "1.5rem",
                }}
                sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
                hideDivider
              >
                {/* <TextXs text="Component depend upon Feat/filter account summary chart" /> */}
                {holdingReportData.product_exposure.map((result, index) => (
                  <HoldingFlagExposure
                    key={index}
                    result={result}
                    tickerName={holdingReportData.ticker_name}
                    exposeDescription={result.expose_description}
                  />
                ))}
              </ClientSummaryCard>
            ) : (
              <></>
            )}

            {holdingReportData.top_holdings_alignment.length ? (
              <ClientSummaryCard
                title={"Top Holdings Alignment"}
                sx={{ padding: "0" }}
                sxContainer={{
                  mt: "2rem",
                  boxShadow: "var(--light-box-shadow)",
                }}
                sxTitle={{ fontSize: "1rem", padding: "1rem 1.25rem" }}
              >
                <TableContainer sx={{ overflow: "visible" }}>
                  <Table>
                    <HoldingsAlignmentHead />

                    <TableBody>
                      {holdingReportData.top_holdings_alignment.map(
                        (result, index) => (
                          <HoldingsAlignmentRow
                            key={index}
                            result={result}
                            resultLength={
                              holdingReportData.top_holdings_alignment.length
                            }
                            index={index}
                          />
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ClientSummaryCard>
            ) : (
              <></>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HoldingReportModal;
