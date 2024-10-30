import { Box, Grid, Stack } from "@mui/material";
import IconText from "components/common/IconText";
import NAValuesIcon from "components/common/NAValuesIcon";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { CloseBlueIcon, FilterBlueIcon } from "constants/images.routes";
import { IKeyAreas } from "interfaces/client";
import Image from "next/image";
import { normalizeProgressValue } from "utils/maths";
import { getTopicNull, getValueAlignmentBg } from "utils/valueAlignment";

interface Props {
  result: IKeyAreas;
  index: number;
  filterAccountHolding: IKeyAreas | null;
  setFilterAccountHolding: (value: IKeyAreas | null) => void;
  handleClickFilter: (index?: number, isRemaining?: boolean) => void;
  isRemaining?: boolean;
}

const ValuesAlignmentCard = ({
  result,
  index,
  filterAccountHolding,
  setFilterAccountHolding,
  handleClickFilter,
  isRemaining,
}: Props) => {
  const value = result.values_alignment.value_score;
  const status_label = result.values_alignment.status_label;
  const isFiltered = filterAccountHolding?.topic_name === result.topic_name;

  const isTopicNull = getTopicNull({
    type: result.type,
    preference: result.preference,
    value,
  });

  return (
    <Grid item xs={4}>
      <Stack
        sx={{
          border: isFiltered ? "4px solid #EFF4FF" : "4px solid transparent",
          borderRadius: "0.8rem",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            padding: "1rem",
            border: isFiltered
              ? "1px solid var(--primary2)"
              : "1px solid var(--gray-200)",
            borderRadius: "0.5rem",
          }}
        >
          <TextMd text={result.topic_name} sx={{ fontSize: "0.75rem" }} />

          <TextXs
            sx={{
              mt: "0.75rem",
              fontSize: "0.75rem",
              lineHeight: "1.25rem",
              color: "var(--text-secondary)",
            }}
            text={"Importance"}
          />

          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.75rem",
              pr: value >= 9 ? "1rem" : "0.6rem",
            }}
          >
            <CustomizedProgressBars
              value={result.importance}
              sx={{
                backgroundColor: "var(--primary)",
                height: "0.6rem",
                "& .MuiLinearProgress-bar": {
                  transition: "none",
                },
              }}
            />
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                color: "var(--text-primary)",
                fontWeight: "500",
              }}
              text={`${normalizeProgressValue(result.importance)}`}
            />
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              mt: "1rem",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <TextXs
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1.25rem",
                  color: "var(--text-secondary)",
                  textTransform: "capitalize",
                }}
                text={result.preference}
              />
              <Image
                priority
                src={result.preference_icon}
                alt={"icon"}
                width={20}
                height={20}
              />
            </Stack>

            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <TextXs
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1.25rem",
                  color: "var(--text-secondary)",
                }}
                text={"Values Alignment"}
              />

              {!isTopicNull && (
                <TextXs
                  sx={{
                    bgcolor: getValueAlignmentBg(status_label)?.backgroundColor,
                    color: getValueAlignmentBg(status_label)?.color,
                    padding: "0.125rem 0.5rem",
                    borderRadius: "1rem",
                    textAlign: "center",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                  text={`${value}`}
                />
              )}

              {isTopicNull && (
                <NAValuesIcon
                  title={"Insufficient data available to generate score."}
                  text={"N/A"}
                />
              )}
            </Stack>
          </Stack>

          <IconText
            icon={isFiltered ? CloseBlueIcon : FilterBlueIcon}
            iconWidth={20}
            iconHeight={20}
            text={isFiltered ? "Remove filter" : "Filter Account Holdings"}
            onClick={() => {
              if (isFiltered) {
                setFilterAccountHolding(null);
                handleClickFilter();
              } else {
                handleClickFilter(index, isRemaining);
                setFilterAccountHolding(result);
              }
            }}
            sxRow={{
              mt: "1.25rem",
              cursor: "pointer",
              width: "fit-content",
            }}
            sxText={{ color: "var(--primary)", fontSize: "0.75rem" }}
          />
        </Stack>

        {isFiltered && (
          <Box
            sx={{
              width: "0.8rem",
              height: "0.8rem",
              backgroundColor: "var(--lightest-blue)",
              position: "absolute",
              left: "50%",
              bottom: "-25px",
              transform: "rotate(45deg)",
            }}
          />
        )}
      </Stack>
    </Grid>
  );
};

export default ValuesAlignmentCard;
