import { Grid, Stack } from "@mui/material";
import FHACardV2 from "components/ui/assessments/FHAs/FHACardV2";
import HeaderSearch from "components/ui/assessments/FHAs/HeaderSearch";
import AssessmentsOverviewSkeleton from "components/ui/assessments/FHAs/Sekeleton/AssessmentsOverviewSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EAllAssessments } from "enums/enums";
import useCustomAssessmentsData from "hooks/useCustomAssessmentsData";
import { ICustomAssessments } from "interfaces/assessment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
dayjs.extend(relativeTime);

const { ALL_ASSESSMENTS } = EAllAssessments;

const FHAsV2 = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [finalCustomAssessments, setFinalCustomAssessments] = useState<
    ICustomAssessments[]
  >([]);

  const { customAssessments, refetch, isRefetching } =
    useCustomAssessmentsData(searchValue);

  const [selectedFHA, setSelectedFHA] = useState<number>(0);

  useEffect(() => {
    if (customAssessments) {
      if (!category || category === ALL_ASSESSMENTS) {
        return setFinalCustomAssessments(customAssessments);
      }

      setFinalCustomAssessments(
        customAssessments.filter((customAssessment) => {
          return (
            customAssessment.parent.name.toLowerCase() ===
            category.toLowerCase()
          );
        })
      );
    }
  }, [category, customAssessments]);

  return (
    <Stack sx={{ bgcolor: "#FFF", minHeight: "100vh" }}>
      <HeaderSearch
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        isLoading={isRefetching && Boolean(searchValue)}
        refetch={refetch}
      />
      <Grid spacing={2} container sx={{ mb: "1rem", paddingX: "2rem" }}>
        {finalCustomAssessments.length ? (
          finalCustomAssessments.map((fha, index) => (
            <Grid key={fha.id} item xs={3}>
              <FHACardV2
                index={index}
                title={fha.name}
                assessmentId={fha.id}
                type={fha.type}
                responses={fha.total_count}
                setSelectedFHA={setSelectedFHA}
                icon={fha.icon}
              />
            </Grid>
          ))
        ) : (
          <AssessmentsOverviewSkeleton />
        )}
      </Grid>
    </Stack>
  );
};

export default FHAsV2;
