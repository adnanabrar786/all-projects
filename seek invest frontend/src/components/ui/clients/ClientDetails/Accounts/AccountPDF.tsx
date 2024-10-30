import { Document, Image, Page, StyleSheet, View } from "@react-pdf/renderer";
import CopyRightsPDF from "components/common/CopyRightsPDF";
import ChipPDF from "components/common/PDF/ChipPDF/ChipPDF";
import TextPDFLg from "components/common/PDF/TextPDF/TextPDFLg";
import TextPDFMd from "components/common/PDF/TextPDF/TextPDFMd";
import TextPDFSm from "components/common/PDF/TextPDF/TextPDFSm";
import TextPDFXxs from "components/common/PDF/TextPDF/TextPDFXxs";
import ValuesAlignmentPDF from "components/common/ValuesAlignmentPDF";
import { LogoBlackWhitePNG } from "constants/images.routes";
import { ALIGNMENTS_SCORE_LABEL, ETicker } from "enums/enums";
import { IClientsAccountDetails, IKeyAreas } from "interfaces/client";
import { truncateStringIfNeeded } from "utils/string";
import { sortAndMoveCashToEndTicker } from "utils/tickers";
import { getValueAlignmentBgPDF } from "utils/valueAlignment";

interface Props {
  riskScore: string | null;
  valueScore: string;
  valueStatus: ALIGNMENTS_SCORE_LABEL | null;
  accountName: string;
  amount: string;
  clientName: string;
  valuesAlignments: IKeyAreas[] | null;
  accountSummary: IClientsAccountDetails[];
}

const AccountPDF = ({
  accountName,
  amount,
  valuesAlignments,
  accountSummary,
  clientName,
  riskScore,
  valueScore,
  valueStatus,
}: Props) => {
  if (accountSummary && accountSummary.length) {
    sortAndMoveCashToEndTicker(accountSummary);
  }

  return (
    <Document>
      <Page size={"A4"} dpi={72}>
        <View style={styles.headerImageContainer}>
          <Image src={LogoBlackWhitePNG} style={styles.headerImage} />
          <TextPDFLg text={clientName} style={{ fontWeight: "semibold" }} />
        </View>

        <View style={styles.viewContainer}>
          <View style={styles.accountHeader}>
            <View style={styles.accountBox}>
              <TextPDFMd
                text={accountName}
                style={{ fontWeight: "semibold" }}
              />
              <TextPDFMd text={`$${amount}`} style={{ color: "#667085" }} />
            </View>

            <View style={styles.riskValueScore}>
              {riskScore && (
                <ChipPDF
                  text={riskScore}
                  style={{
                    ...styles.chip,
                    backgroundColor: "#f2f4f7",
                    color: "#667085",
                  }}
                />
              )}

              {valueStatus && (
                <ChipPDF
                  text={`Values Alignment ${valueScore}`}
                  style={{
                    ...styles.chip,

                    backgroundColor:
                      getValueAlignmentBgPDF(valueStatus).backgroundColor,
                    color: getValueAlignmentBgPDF(valueStatus).color,
                  }}
                />
              )}
            </View>
          </View>

          {valuesAlignments && valuesAlignments.length ? (
            <ValuesAlignmentPDF
              styles={styles}
              valuesAlignments={valuesAlignments}
            />
          ) : (
            <></>
          )}

          {accountSummary && (
            <View
              style={[styles.gridItem, { width: "100%", marginTop: "20px" }]}
            >
              <TextPDFSm
                text="Account Summary"
                style={styles.gridItemHeading}
              />

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.header]}>
                  {[
                    "Ticker",
                    "Description",
                    "Current Value",
                    "Percentage Value",
                    "RiskScore",
                    "Values Alignment",
                  ].map((val, i) => (
                    <View
                      style={[
                        styles.tableCol,
                        {
                          textAlign:
                            i === 0 || i === 1 || i === 2 ? "left" : "center",
                          width: i == 0 ? "15%" : i == 1 ? "50%" : "30%",
                        },
                      ]}
                      key={i}
                    >
                      <TextPDFXxs
                        text={val}
                        style={{ ...styles.tableCell, color: "#667085" }}
                      />
                    </View>
                  ))}
                </View>

                {accountSummary.map((val, i) =>
                  val.ticker !== ETicker.$CASH ? (
                    <View
                      key={i}
                      wrap={false}
                      style={[styles.tableRow, { alignItems: "center" }]}
                    >
                      <View
                        style={[
                          styles.tableCol,
                          { textAlign: "left", width: "15%" },
                        ]}
                      >
                        <TextPDFXxs
                          text={val.ticker}
                          style={{ ...styles.tableCell, fontWeight: "medium" }}
                        />
                      </View>

                      <View
                        style={[
                          styles.tableCol,
                          { textAlign: "left", width: "50%" },
                        ]}
                      >
                        {val.description && (
                          <TextPDFXxs
                            text={truncateStringIfNeeded(val.description, 30)}
                            style={styles.tableCell}
                          />
                        )}
                      </View>

                      <View style={[styles.tableCol, { textAlign: "left" }]}>
                        <TextPDFXxs
                          text={val.amount ? `$${val.amount}` : "$0"}
                          style={styles.tableCell}
                        />
                      </View>

                      <View style={styles.tableCol}>
                        <TextPDFXxs
                          text={`${val.percentage}%`}
                          style={styles.tableCell}
                        />
                      </View>

                      <View style={[styles.tableCol, { alignItems: "center" }]}>
                        {val.risk_score !== null ? (
                          <TextPDFXxs
                            text={`${val.risk_score}`}
                            style={{
                              ...styles.tableCell,
                              ...styles.riskCircle,
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

                      <View style={[styles.tableCol, { alignItems: "center" }]}>
                        {val.values_alignment ? (
                          <TextPDFXxs
                            text={`${val.values_alignment?.value_score}`}
                            style={{
                              ...styles.tableCell,
                              ...styles.valuesCircle,
                              backgroundColor: getValueAlignmentBgPDF(
                                val.values_alignment.value_status
                              ).backgroundColor,
                              color: getValueAlignmentBgPDF(
                                val.values_alignment.value_status
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
                  ) : (
                    <View style={[styles.tableRow, { alignItems: "center" }]}>
                      <View
                        style={[
                          styles.tableCol,
                          { textAlign: "left", width: "65%" },
                        ]}
                      >
                        <TextPDFXxs
                          text={"Cash and other non-scorable items"}
                          style={{ ...styles.tableCell, fontWeight: "medium" }}
                        />
                      </View>

                      <View style={[styles.tableCol, { textAlign: "left" }]}>
                        <TextPDFXxs
                          text={val.amount ? `$${val.amount}` : "$0"}
                          style={styles.tableCell}
                        />
                      </View>

                      <View style={[styles.tableCol]}>
                        <TextPDFXxs
                          text={`${val.percentage}%`}
                          style={styles.tableCell}
                        />
                      </View>

                      <View style={[styles.tableCol]}></View>

                      <View style={[styles.tableCol]}></View>
                    </View>
                  )
                )}

                <View
                  wrap={false}
                  style={[
                    styles.tableRow,
                    { alignItems: "center" },
                    styles.header,
                  ]}
                >
                  <View
                    style={[
                      styles.tableCol,
                      { textAlign: "left", width: "90%" },
                    ]}
                  >
                    <TextPDFXxs
                      text={"TOTAL"}
                      style={{
                        ...styles.tableCell,
                        color: "#667085",
                        fontWeight: "medium",
                      }}
                    />
                  </View>

                  <View style={[styles.tableCol]}>
                    <TextPDFXxs
                      text={"0%"}
                      style={{ ...styles.tableCell, color: "#667085" }}
                    />
                  </View>

                  <View style={[styles.tableCol]}></View>

                  <View style={[styles.tableCol]}></View>
                </View>
              </View>
            </View>
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

  chip: {
    padding: "4px 8px",
    borderRadius: "16px",
    fontWeight: "medium",
  },

  clientName: {
    fontWeight: "semibold",
    borderBottom: "1px solid #EAECF0",
    paddingBottom: "24px",
  },

  accountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  accountBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
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
export default AccountPDF;
