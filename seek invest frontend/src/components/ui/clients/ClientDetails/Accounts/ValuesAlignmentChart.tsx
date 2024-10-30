import { Grid, Skeleton, Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import ValuesAlignmentCard from "components/ui/clients/ClientDetails/Accounts/ValuesAlignmentCard";
import useClientAccountValueChartData from "hooks/useClientAccountValueChartData";
import { IClientsAccountDetails, IKeyAreas } from "interfaces/client";
import { useEffect, useMemo, useState } from "react";

interface Props {
  accountId: string;
  isOpened: boolean;
  filterAccountHolding: IKeyAreas | null;
  setFilterAccountHolding: (value: IKeyAreas | null) => void;
  accountDetails: IClientsAccountDetails[];
}

const ValuesAlignmentChart = ({
  accountId,
  isOpened,
  filterAccountHolding,
  setFilterAccountHolding,
  accountDetails,
}: Props) => {
  const [sliceIndex, setSliceIndex] = useState(0);
  const { valuesChart, isLoading } = useClientAccountValueChartData(
    accountId,
    isOpened
  );

  const [valuesAlignments, setValuesAlignments] = useState<IKeyAreas[] | []>(
    []
  );
  const [remainingAlignments, setRemainingAlignments] = useState(valuesChart);

  const handleClickFilter = (index?: number, isRemaining = false) => {
    if (valuesChart) {
      if (index !== undefined) {
        const itemsPerRow = 3;
        const actualIndex = isRemaining
          ? valuesAlignments.length + index
          : index;
        const rowIndex = Math.floor(actualIndex / itemsPerRow) + 1;
        const tempSliceIndex = rowIndex * itemsPerRow;
        setSliceIndex(tempSliceIndex);
        setValuesAlignments(valuesChart.slice(0, tempSliceIndex));
        setRemainingAlignments(valuesChart.slice(tempSliceIndex));
      } else {
        setValuesAlignments([]);
        setRemainingAlignments(valuesChart);
      }
    }
  };

  useMemo(() => {
    if (valuesChart) {
      if (valuesAlignments.length) {
        setValuesAlignments(valuesChart.slice(0, sliceIndex));
        setRemainingAlignments(valuesChart.slice(sliceIndex));
      } else {
        setRemainingAlignments(valuesChart);
      }
    }
  }, [valuesChart]);

  useEffect(() => {
    if (accountDetails && accountDetails.length === 1) {
      setValuesAlignments([]);
      setRemainingAlignments([]);
    }
  }, [accountDetails]);

  return isLoading || valuesChart?.length ? (
    <Stack
      sx={{
        border: "1px solid var(--gray-200)",
        borderRadius: "0.5rem",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        padding: "1rem 1.25rem",
      }}
    >
      <TextXs
        sx={{
          fontSize: "1rem",
          fontWeight: "600",
          lineHeight: "1.5rem",
          mb: "1rem",
        }}
        text={"Values Alignment"}
      />

      <Grid container spacing={2}>
        {remainingAlignments ? (
          <>
            {valuesAlignments.length > 0 && (
              <>
                {valuesAlignments.map((result, index) => (
                  <ValuesAlignmentCard
                    key={index}
                    result={result}
                    index={index}
                    filterAccountHolding={filterAccountHolding}
                    setFilterAccountHolding={setFilterAccountHolding}
                    handleClickFilter={handleClickFilter}
                  />
                ))}

                {filterAccountHolding && (
                  <Grid item xs={12}>
                    <Stack
                      sx={{
                        gap: "0.5rem",
                        backgroundColor: "var(--lightest-blue)",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        ">p": { fontSize: "0.75rem" },
                      }}
                    >
                      <TextXs
                        text={filterAccountHolding.topic_name}
                        sx={{ fontWeight: "500" }}
                      />
                      <TextXs text={filterAccountHolding.description} />
                    </Stack>
                  </Grid>
                )}
              </>
            )}

            {remainingAlignments.map((result, index) => (
              <ValuesAlignmentCard
                key={index}
                result={result}
                filterAccountHolding={filterAccountHolding}
                setFilterAccountHolding={setFilterAccountHolding}
                handleClickFilter={handleClickFilter}
                isRemaining={true}
                index={index}
              />
            ))}
          </>
        ) : (
          Array.from({ length: 3 }).map((val, idx) => (
            <Grid item key={idx} xs={4}>
              <Skeleton sx={{ height: "15rem" }} />
            </Grid>
          ))
        )}
      </Grid>
    </Stack>
  ) : null;
};

export default ValuesAlignmentChart;
