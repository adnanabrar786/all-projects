import { Box, Dialog, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import CustomCheckBox from "components/common/CheckBox/CustomCheckBox";
import TextMd from "components/common/Text/TextMd";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import SearchHolding from "components/ui/clients/ClientDetails/Accounts/SearchHolding";
import { TickCheckboxIcon, UnCheckboxIcon } from "constants/images.routes";
import download from "downloadjs";
import { IClient, ISecuritiesDetail } from "interfaces/client";
import { useState } from "react";
import { generateComparisonReport } from "services/comparison_report.services";
import { toastSuccess } from "utils/toaster";

interface Props {
  openComparisonReport: { id: string; ticker: string; name: string };
  accountId: string;
  setOpenComparisonReport: (
    value: { id: string; ticker: string; name: string } | null
  ) => void;
  client: IClient | null;
}

const ComparisonReportModal = ({
  openComparisonReport,
  setOpenComparisonReport,
  accountId,
  client,
}: Props) => {
  const [secondBoxTicker, setSecondBoxTicker] = useState({
    ticker: "",
    name: "",
  });
  const [clientName, setClientName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickHolding = async ({ ticker, name }: ISecuritiesDetail) => {
    setSecondBoxTicker({ name, ticker });
  };

  const handleClickGenerate = async () => {
    setIsLoading(true);

    const data = await generateComparisonReport({
      symbol1: openComparisonReport.ticker,
      symbol1Name: openComparisonReport.name,
      symbol2: secondBoxTicker.ticker,
      symbol2Name: secondBoxTicker.name,
      clientName,
      clientId: client?.id,
    });

    download(
      data.data,
      `${openComparisonReport.ticker} vs ${secondBoxTicker.ticker} Comprehensive Side by Side Report.pdf`,
      "application/pdf"
    );

    toastSuccess("Comparison report generated successfully!");

    setIsLoading(false);
    setOpenComparisonReport(null);
  };

  const handleCheckboxChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    if (checked && client) {
      setClientName(`${client.first_name} ${client.last_name}`);
    } else {
      setClientName("");
    }
  };

  return (
    <Stack
      sx={{
        width: "25rem",
      }}
    >
      <Dialog
        open
        onClose={() => setOpenComparisonReport(null)}
        fullWidth
        PaperProps={{
          sx: {
            overflow: "initial",
            maxWidth: "800px",
            borderRadius: "1rem",
            width: "25rem",
            ".closeIcon": {
              position: "absolute",
              right: "2.41rem",
              top: "1.87rem",
              cursor: "pointer",
            },
          },
        }}
      >
        <Stack
          sx={{
            padding: "1.5rem",
          }}
        >
          <Stack
            sx={{
              gap: "0.5rem",
            }}
          >
            <TextMd
              sx={{
                lineHeight: "1.75rem",
                color: "var(--text-grey)",
                fontWeight: "500",
              }}
              text="Generate Fund Comparison Report"
            />
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                color: "var(--text-secondary)",
              }}
              text="Enter an additional fund for comparison to analyze performance metrics, risk factors, fundamentals and values alignment."
            />
          </Stack>

          <Stack
            sx={{
              marginTop: "1.5rem",
              border: "1px solid var(--border-color)",
              padding: "0.63rem 0.88rem",
              borderRadius: "0.5rem",
            }}
          >
            <TextSm
              sx={{
                lineHeight: "1.5rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              text={openComparisonReport.name}
            />
          </Stack>

          <Stack
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                marginTop: "1.22rem",
                borderTop: "1px solid var(--gray-200)",
              }}
            />
            <TextSm
              sx={{
                lineHeight: "1.5rem",
                position: "absolute",
                top: "0.4rem",
                left: "46%",
                backgroundColor: "var(--background-color2)",
                color: "var(--text-secondary)",
                padding: "0rem 0.5rem",
              }}
              text="vs"
            />
          </Stack>

          <Stack
            sx={{
              marginTop: "1.3rem",
            }}
          >
            <SearchHolding
              fundTicker={true}
              handleClickHolding={handleClickHolding}
              setAddHolding={() => {}}
              placeholder="Enter ticker or fund"
              sx={{
                mb: "0rem",
              }}
              sxResult={{
                width: "100%",
                maxHeight: "15rem",
                overflow: "auto",
                flexWrap: "nowrap",
                position: "absolute",
                zIndex: "1000000000000",
              }}
            />
          </Stack>

          <Stack>
            <CustomCheckBox
              onChange={handleCheckboxChange}
              width={16}
              height={16}
              checkedIcon={TickCheckboxIcon}
              icon={UnCheckboxIcon}
              label="Include Client Name"
              sxText={{
                fontWeight: "400",
              }}
              sxForm={{
                padding: "0",
                paddingLeft: "0.25rem",
                marginY: "1.5rem",
                width: "fit-content",
              }}
            />
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              gap: "0.75rem",
            }}
          >
            <FilledButton
              onClick={() => setOpenComparisonReport(null)}
              sx={{
                padding: "0.625rem 1.125rem",
                width: "48%",
                fontSize: "1rem",
              }}
              text={"Cancel"}
              secondary
            />
            <FilledButton
              disabled={!secondBoxTicker.ticker || isLoading}
              loading={isLoading}
              onClick={handleClickGenerate}
              sx={{
                padding: "0.625rem 1.125rem",
                width: "48%",
                fontSize: "1rem",
              }}
              text={"Generate"}
            />
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default ComparisonReportModal;
