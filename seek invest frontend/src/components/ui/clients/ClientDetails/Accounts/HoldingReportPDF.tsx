import { Document, Image, Page, StyleSheet, View } from "@react-pdf/renderer";
import CopyRightsPDF from "components/common/CopyRightsPDF";
import ChipPDF from "components/common/PDF/ChipPDF/ChipPDF";
import TextPDFLg from "components/common/PDF/TextPDF/TextPDFLg";
import TextPDFSm from "components/common/PDF/TextPDF/TextPDFSm";
import TextPDFXxs from "components/common/PDF/TextPDF/TextPDFXxs";
import ProgressBarPDF from "components/common/ProgressBarPDF";
import ValuesAlignmentPDF from "components/common/ValuesAlignmentPDF";
import { LogoBlackWhitePNG, RedFlagPNG } from "constants/images.routes";
import { ALIGNMENTS_SCORE_LABEL } from "enums/enums";
import {
  IHoldingReportPerformance,
  IHoldingReportRegionalExposure,
  IHoldingReportSectorExposure,
  IHoldingTopHoldingsAlignment,
  IKeyAreas,
  IProductExposure,
} from "interfaces/client";
import { getValueAlignmentBgPDF } from "utils/valueAlignment";

interface Props {
  performanceData: IHoldingReportPerformance[];
  riskStatistics: any;
  sectorExposure: IHoldingReportSectorExposure[];
  regionalExposure: IHoldingReportRegionalExposure[];
  valuesAlignments: IKeyAreas[];
  product_exposure: IProductExposure[];
  topHoldingsAlignment: IHoldingTopHoldingsAlignment[];
  ticker: string;
  label: string;
  description: string;
  clientName: string;
  riskScore: string;
  valueScore: string;
  valueStatus: ALIGNMENTS_SCORE_LABEL;
}

const HoldingReportPDF = ({
  performanceData,
  riskStatistics,
  sectorExposure,
  regionalExposure,
  product_exposure,
  valuesAlignments,
  topHoldingsAlignment,
  ticker,
  label,
  description,
  clientName,
  riskScore,
  valueScore,
  valueStatus,
}: Props) => {
  return (
    <Document>
      <Page size={"A4"} dpi={72}>
        <View style={styles.headerImageContainer}>
          <Image src={LogoBlackWhitePNG} style={styles.headerImage} />
          <TextPDFLg text={clientName} style={{ fontWeight: "semibold" }} />
        </View>

        <View style={styles.viewContainer}>
          <View style={styles.tickerHeader}>
            <View>
              <View style={styles.tickerBox}>
                <TextPDFSm text={ticker} style={{ fontWeight: "bold" }} />
                <ChipPDF text={label} style={styles.tickerType} />
              </View>

              <TextPDFLg text={description} style={styles.tickerName} />
            </View>

            <View style={styles.riskValueScore}>
              <View style={styles.riskValueScoreBox}>
                <TextPDFXxs
                  text="Risk Score"
                  style={styles.riskValueScoreText}
                />
                <TextPDFXxs
                  text={riskScore !== null ? riskScore : "N/A"}
                  style={styles.riskCircle}
                />
              </View>

              <View style={styles.riskValueScoreBox}>
                <TextPDFXxs
                  text="Values Alignment"
                  style={styles.riskValueScoreText}
                />
                <TextPDFXxs
                  text={valueScore}
                  style={{
                    ...styles.valuesCircle,
                    backgroundColor:
                      getValueAlignmentBgPDF(valueStatus).backgroundColor,
                    color: getValueAlignmentBgPDF(valueStatus).color,
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <TextPDFSm
                text="Performance Data"
                style={styles.gridItemHeading}
              />

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.header]}>
                  <View style={[styles.tableCol, styles.tableFirstCol]}>
                    <TextPDFXxs
                      text={"Trailing Returns"}
                      style={{
                        color: "#667085",
                      }}
                    />
                  </View>

                  {["YTD", "1Y", "3Y", "5Y"].map((val, i) => (
                    <View key={i} style={styles.tableCol}>
                      <TextPDFXxs
                        text={val}
                        style={{ ...styles.tableCell, color: "#667085" }}
                      />
                    </View>
                  ))}
                </View>

                {performanceData.map((val, i) => (
                  <View key={i} style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableFirstCol]}>
                      <TextPDFXxs
                        text={val.trailing_returns}
                        style={{
                          fontWeight: "medium",
                        }}
                      />
                    </View>

                    <View style={styles.tableCol}>
                      <TextPDFXxs
                        text={`${val.return_ytd}`}
                        style={styles.tableCell}
                      />
                    </View>
                    <View style={styles.tableCol}>
                      <TextPDFXxs
                        text={`${val.return_1yr}`}
                        style={styles.tableCell}
                      />
                    </View>
                    <View style={styles.tableCol}>
                      <TextPDFXxs
                        text={`${val.return_3yr}`}
                        style={styles.tableCell}
                      />
                    </View>
                    <View style={styles.tableCol}>
                      <TextPDFXxs
                        text={`${val.return_5yr}`}
                        style={styles.tableCell}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.gridItem}>
              <TextPDFSm
                text="Risk Statistics"
                style={styles.gridItemHeading}
              />

              {riskStatistics.map((val, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: "1px solid #EAECF0",
                    padding: "8px 12px",
                  }}
                >
                  <TextPDFXxs
                    text={val.title}
                    style={{ fontWeight: "medium" }}
                  />
                  <TextPDFXxs text={val.value} />
                </View>
              ))}
            </View>
          </View>

          {sectorExposure.length ? (
            <View
              style={[styles.gridItem, { width: "100%", marginTop: "20px" }]}
            >
              <TextPDFSm
                text="Sector Exposure"
                style={styles.gridItemHeading}
              />

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.header]}>
                  <View style={[styles.tableCol, styles.tableFirstCol]}>
                    <TextPDFXxs
                      text={"Sector"}
                      style={{ ...styles.tableCell, color: "#667085" }}
                    />
                  </View>

                  {[ticker, "SPY ETF"].map((val, i) => (
                    <View
                      key={i}
                      style={[styles.tableCol, { textAlign: "left" }]}
                    >
                      <TextPDFXxs
                        text={val}
                        style={{ ...styles.tableCell, color: "#667085" }}
                      />
                    </View>
                  ))}
                </View>

                {sectorExposure.map((val, i) => (
                  <View
                    key={i}
                    wrap={false}
                    style={{ ...styles.tableRow, minHeight: "27px" }}
                  >
                    <View style={[styles.tableCol, styles.tableFirstCol]}>
                      <TextPDFXxs
                        text={val.sector}
                        style={{ ...styles.tableCell, fontWeight: "medium" }}
                      />
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          gap: "8px",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: "50px",
                        },
                      ]}
                    >
                      {val.portfolio_exposure ? (
                        <>
                          <ProgressBarPDF
                            percentage={Number(
                              val.portfolio_exposure.replace("%", "")
                            )}
                            sx={{ backgroundColor: "#f79009", height: "8px" }}
                          />

                          <TextPDFXxs
                            text={`${val.portfolio_exposure}`}
                            style={{
                              ...styles.tableCell,
                              fontWeight: "medium",
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </View>

                    <View
                      style={[
                        styles.tableCol,
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: "50px",
                        },
                      ]}
                    >
                      {val.benchmark_exposure ? (
                        <>
                          <ProgressBarPDF
                            percentage={val.benchmark_exposure}
                            sx={{ backgroundColor: "#f79009", height: "8px" }}
                          />
                          <TextPDFXxs
                            text={`${val.benchmark_exposure}`}
                            style={{
                              ...styles.tableCell,
                              fontWeight: "medium",
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <></>
          )}

          {regionalExposure.length ? (
            <View
              wrap={false}
              style={[styles.gridItem, { width: "100%", marginTop: "20px" }]}
            >
              <TextPDFSm
                text="Regional Exposure"
                style={{ ...styles.gridItemHeading, paddingBottom: "8px" }}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: "16px",
                  padding: "8px",
                  flexWrap: "wrap",
                }}
              >
                {regionalExposure.map((val, i) => (
                  <TextPDFXxs
                    key={i}
                    text={`${val.region} ${val.percentage}%`}
                    style={{
                      ...styles.tableCell,
                      backgroundColor: "#f2f4f7",
                      padding: "4px 8px",
                      borderRadius: "16px",
                      fontWeight: "medium",
                    }}
                  />
                ))}
              </View>
            </View>
          ) : (
            <></>
          )}

          {valuesAlignments && valuesAlignments.length ? (
            <ValuesAlignmentPDF
              styles={styles}
              valuesAlignments={valuesAlignments}
              viewReport
              label={label}
            />
          ) : (
            <></>
          )}

          {product_exposure.length ? (
            <View
              style={[styles.gridItem, { width: "100%", marginTop: "20px" }]}
            >
              <TextPDFSm
                text="Product Exposure"
                style={styles.gridItemHeading}
              />

              {product_exposure.map((val, i) => (
                <View key={i} wrap={false} style={{ padding: "8px" }}>
                  <View
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      backgroundColor: "#fef3f2",
                      padding: "10px 12px",
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: "10px" }}>
                      <Image
                        src={RedFlagPNG}
                        style={{ width: "10px", height: "10px" }}
                      />
                      <TextPDFXxs
                        text={val.name}
                        style={{
                          color: "#D92D20",
                          gap: "10px",
                          fontWeight: "medium",
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: "20px",
                        marginTop: "5px",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <TextPDFXxs
                          text={val.expose_description}
                          style={{ width: "70%" }}
                        />
                      </View>
                      {val.percentage && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <TextPDFXxs
                            text={
                              ticker
                                ? `${ticker} Portfolio Exposed`
                                : "Portfolio Exposed"
                            }
                          />
                          <TextPDFXxs
                            text={`${val.percentage}%`}
                            style={{
                              fontWeight: "medium",
                              padding: "4px 8px",
                              backgroundColor: "white",
                              borderRadius: "16px",
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <></>
          )}

          {topHoldingsAlignment.length ? (
            <View
              style={[styles.gridItem, { width: "100%", marginTop: "20px" }]}
            >
              <TextPDFSm
                text="Top Holdings Alignment"
                style={styles.gridItemHeading}
              />

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.header]}>
                  {[
                    "Ticker",
                    "Name",
                    "Weight",
                    "RiskScore",
                    "Values Alignment",
                  ].map((val, i) => (
                    <View
                      key={i}
                      style={[
                        styles.tableCol,
                        { textAlign: i === 0 || i === 1 ? "left" : "center" },
                      ]}
                    >
                      <TextPDFXxs
                        text={val}
                        style={{ ...styles.tableCell, color: "#667085" }}
                      />
                    </View>
                  ))}
                </View>

                {topHoldingsAlignment.map((val, i) => (
                  <View
                    key={i}
                    wrap={false}
                    style={[styles.tableRow, { alignItems: "center" }]}
                  >
                    <View style={[styles.tableCol, { textAlign: "left" }]}>
                      <TextPDFXxs
                        text={val.ticker}
                        style={{ ...styles.tableCell, fontWeight: "medium" }}
                      />
                    </View>

                    <View style={[styles.tableCol, { textAlign: "left" }]}>
                      <TextPDFXxs text={val.name} style={styles.tableCell} />
                    </View>

                    <View style={styles.tableCol}>
                      <TextPDFXxs
                        text={`${val.weight}%`}
                        style={styles.tableCell}
                      />
                    </View>

                    <View style={[styles.tableCol, { alignItems: "center" }]}>
                      {val.risk_score !== null ? (
                        <TextPDFXxs
                          text={val.risk_score}
                          style={{ ...styles.tableCell, ...styles.riskCircle }}
                        />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f9fafb",
                            padding: "4px 6px",
                            borderRadius: "16px",
                            gap: "2px",
                          }}
                        >
                          <TextPDFXxs
                            style={{
                              color: "#667085",

                              fontWeight: "medium",
                            }}
                            text={"N/A"}
                          />
                        </View>
                      )}
                    </View>

                    <View style={[styles.tableCol, { alignItems: "center" }]}>
                      {val.values_alignment.value_score ? (
                        <TextPDFXxs
                          text={`${val.values_alignment.value_score}`}
                          style={{
                            ...styles.tableCell,
                            ...styles.valuesCircle,
                            backgroundColor: getValueAlignmentBgPDF(
                              val.values_alignment.status_label
                            ).backgroundColor,
                            color: getValueAlignmentBgPDF(
                              val.values_alignment.status_label
                            ).color,
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f9fafb",
                            padding: "4px 6px",
                            borderRadius: "16px",
                            gap: "2px",
                          }}
                        >
                          <TextPDFXxs
                            style={{
                              color: "#667085",

                              fontWeight: "medium",
                            }}
                            text={"N/A"}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>

        <CopyRightsPDF />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
  },

  headerImageContainer: {
    padding: "30px",
    paddingLeft: "24px",
    paddingRight: "24px",
    backgroundColor: "#F2F4F7",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerImage: {
    width: 122,
    height: 24,
  },

  viewContainer: {
    paddingLeft: "24px",
    paddingRight: "24px",
    marginTop: "25px",
  },

  tickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tickerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },

  tickerType: {
    fontSize: "11.2px",
    backgroundColor: "#f4f3ff",
    color: "#6938ef",
    textTransform: "capitalize",
  },

  tickerName: {
    color: "#667085",
    marginTop: "8px",
  },

  riskValueScore: {
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
  },
  riskValueScoreText: {
    fontWeight: "medium",
  },

  riskValueScoreBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #EAECF0",
    paddingRight: "5px",
    paddingLeft: "5px",
    borderRadius: "8px",
    height: "28px",
  },

  riskCircle: {
    padding: "5px",
    borderRadius: "50%",
    textAlign: "center",
    backgroundColor: "#F9FAFB",
    color: "#475467",
    fontWeight: "medium",
  },

  valuesCircle: {
    padding: "5px",
    borderRadius: "50%",
    textAlign: "center",
    backgroundColor: "#ecfdf3",
    color: "#039855",
    fontWeight: "medium",
  },

  gridContainer: {
    flexDirection: "row",
    marginTop: "20px",
    gap: "16px",
    alignItems: "flex-start",
  },

  gridItem: {
    flexDirection: "column",
    border: "1px solid #EAECF0",
    justifyContent: "center",
    borderRadius: "8px",
    width: "50%",
  },

  gridItemHeading: {
    fontWeight: "semibold",
    padding: "10px 12px",
  },

  table: {
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    padding: "8px 12px",
    borderTop: "1px solid #EAECF0",
  },
  tableCol: {
    width: "30%",
    textAlign: "center",
  },

  tableFirstCol: {
    width: "50%",
    textAlign: "left",
  },

  tableCell: {},

  header: {
    backgroundColor: "#f9fafb",
    fontWeight: "medium",
  },

  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "red",
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default HoldingReportPDF;
