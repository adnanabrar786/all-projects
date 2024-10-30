import { Stack } from "@mui/material";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import TextXxs from "components/common/Text/TextXxs";
import CustomTooltip from "components/common/Tooltip/CustomTooltip";
import { InfoCircleIcon, RedFlagIcon } from "constants/images.routes";
import { EProductExposureTopics } from "enums/framework";
import { IHoldingReportProductExposure } from "interfaces/client";
import Image from "next/image";

const { Abortifacients } = EProductExposureTopics;

interface Props {
  result: IHoldingReportProductExposure;
  exposeDescription?: string;
  tickerName?: string;
}

const tickerInfo = [
  "Either production of mifepristone, misoprostol or RU-486 pills for use as abortifacients or only methotrexate pills, which are used for the termination of pregnancy",
  "Includes vaginal suppository indicated for the termination of pregnancy  ",
  "Information is not considered if the company claims to produce methotrexate pills whose indicated use is for the treatment of neoplastic diseases, severe psoriasis, and rheumatoid arthritis as well as producing the raw material mifepristone for use in laboratory or research only",
  "Primarily relevant to the pharmaceuticals & medical research sector companies",
];

const HoldingFlagExposure = ({
  result,
  exposeDescription,
  tickerName,
}: Props) => {
  return (
    <Stack
      sx={{
        padding: "1rem",
        borderRadius: "0.5rem",
        width: "100%",
        bgcolor: "var(--red-shadwow)",
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          gap: "0.5rem",
          ".imageInfo": { cursor: "pointer" },
        }}
      >
        <IconText
          icon={RedFlagIcon}
          iconWidth={12}
          iconHeight={12}
          text={result.name}
          sxRow={{
            gap: "0.63rem",
          }}
          sxText={{ color: "var(--carnelian-light)", fontSize: "0.75rem" }}
        />

        {result.name === Abortifacients && (
          <CustomTooltip
            sx={{ minWidth: "36rem", padding: "0.5rem 0.75rem" }}
            placement={"top-end"}
            title={
              <Stack>
                <TextXxs
                  text="The Following aspects were considered:"
                  sx={{ mb: "0.8rem" }}
                />
                {tickerInfo.map((val, i) => (
                  <Stack key={i} direction={"row"} sx={{ gap: "0.25rem" }}>
                    <TextXxs text={"•"} />
                    <TextXxs text={val} />
                  </Stack>
                ))}
              </Stack>
            }
          >
            <Image
              className="imageInfo"
              priority
              src={InfoCircleIcon}
              alt={"icon"}
              width={14}
              height={14}
            />
          </CustomTooltip>
        )}
      </Stack>

      <Stack
        direction={"row"}
        sx={{ mt: "0.5rem", justifyContent: "space-between" }}
      >
        <TextXs
          text={
            exposeDescription
              ? exposeDescription
              : result.description
              ? result.description
              : ""
          }
          sx={{ ml: "1.4rem", fontSize: "0.75rem", width: "70%" }}
        />

        {result.percentage && (
          <Stack direction="row" sx={{ alignItems: "center", gap: "0.5rem" }}>
            <TextXxs
              text={
                tickerName
                  ? `${tickerName} Portfolio Exposed`
                  : "Portfolio Exposed"
              }
              sx={{ fontSize: "0.75rem" }}
            />
            <TextXxs
              text={`${result.percentage}%`}
              sx={{
                fontWeight: "500",
                padding: "0.125rem 0.5rem",
                backgroundColor: "white",
                borderRadius: "1rem",
              }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default HoldingFlagExposure;
