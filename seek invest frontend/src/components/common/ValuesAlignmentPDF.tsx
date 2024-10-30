import { Image, View } from "@react-pdf/renderer";
import TextPDFSm from "components/common/PDF/TextPDF/TextPDFSm";
import TextPDFXxs from "components/common/PDF/TextPDF/TextPDFXxs";
import ProgressBarPDF from "components/common/ProgressBarPDF";
import { ThumbsDownPNG, ThumbsUpPNG } from "constants/images.routes";
import { ETopicType } from "enums/enums";
import { EPreference } from "enums/framework";
import { IKeyAreas } from "interfaces/client";
import { normalizeProgressValue } from "utils/maths";
import { getTopicNull, getValueAlignmentBgPDF } from "utils/valueAlignment";

const { EMBRACE } = EPreference;
const { PRODUCT, NON_PRODUCT } = ETopicType;

interface Props {
  styles: any;
  valuesAlignments: IKeyAreas[];
  viewReport?: boolean;
  label?: string;
}

const ValuesAlignmentPDF = ({
  styles,
  valuesAlignments,
  viewReport,
  label,
}: Props) => {
  let headers = ["Preference", "Importance", "Values Alignment"];
  if (viewReport && label === "fund") {
    headers = [
      "Preference",
      "Importance",
      "Portfolio Exposure %",
      "Values Alignment",
    ];
  }
  return (
    <View style={[styles.gridItem, { width: "100%", marginTop: "20px" }]}>
      <TextPDFSm text="Values Alignment" style={styles.gridItemHeading} />

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.header]}>
          <View style={[styles.tableCol, styles.tableFirstCol]}>
            <TextPDFXxs
              text={"Topic"}
              style={{ ...styles.tableCell, color: "#667085" }}
            />
          </View>

          {headers.map((val, i) => (
            <View style={styles.tableCol} key={i}>
              <TextPDFXxs
                text={val}
                style={{ ...styles.tableCell, color: "#667085" }}
              />
            </View>
          ))}
        </View>

        {valuesAlignments.map((val, i) => {
          const value = val.values_alignment.value_score;
          const status_label = val.values_alignment.status_label;

          const showValueAlignment = value || value === 0;

          const isTopicNull = getTopicNull({
            type: val.type,
            preference: val.preference,
            value,
          });

          return (
            <View
              key={i}
              wrap={false}
              style={[
                styles.tableRow,
                { alignItems: "center", minHeight: "35px" },
              ]}
            >
              <View style={[styles.tableCol, styles.tableFirstCol]}>
                <TextPDFXxs
                  text={val.topic_name}
                  style={{ ...styles.tableCell, fontWeight: "medium" }}
                />
              </View>

              <View style={styles.tableCol}>
                <View
                  style={{
                    ...styles.tableCell,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: "12px",
                      height: "12px",
                    }}
                    src={
                      val.preference === EMBRACE ? ThumbsUpPNG : ThumbsDownPNG
                    }
                  />
                </View>
              </View>

              <View
                style={[
                  styles.tableCol,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                  },
                ]}
              >
                <ProgressBarPDF
                  percentage={normalizeProgressValue(val.importance) * 10}
                  sx={{ backgroundColor: "#1A3ED2", height: "8px" }}
                />

                <TextPDFXxs
                  text={`${normalizeProgressValue(val.importance, true)}`}
                  style={{ ...styles.tableCell, fontWeight: "medium" }}
                />
              </View>

              {viewReport && label === "fund" && (
                <View style={[styles.tableCol, { alignItems: "center" }]}>
                  <TextPDFXxs
                    text={
                      val.product_exposure === null
                        ? "N/A"
                        : `${(val.product_exposure * 100).toFixed(2)}%`
                    }
                    style={{ ...styles.tableCell, fontWeight: "medium" }}
                  />
                </View>
              )}

              <View style={[styles.tableCol, { alignItems: "center" }]}>
                {showValueAlignment ? (
                  isTopicNull ? (
                    <>
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
                    </>
                  ) : (
                    <TextPDFXxs
                      text={`${value}`}
                      style={{
                        ...styles.valuesCircle,
                        backgroundColor:
                          getValueAlignmentBgPDF(status_label).backgroundColor,
                        color: getValueAlignmentBgPDF(status_label).color,
                      }}
                    />
                  )
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
          );
        })}
      </View>
    </View>
  );
};

export default ValuesAlignmentPDF;
