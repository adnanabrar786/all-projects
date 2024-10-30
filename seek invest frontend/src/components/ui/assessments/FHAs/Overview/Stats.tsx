import { Grid } from "@mui/material";
import OverviewCard from "components/ui/assessments/FHAs/Overview/OverviewCard";
import useAssessmentEngagement from "hooks/useAssessmentEngagement";
import { useParams } from "next/navigation";

const Stats = () => {
  const { assessmentId }: { assessmentId: string } = useParams();
  const { assessmentEngagement, isLoading } =
    useAssessmentEngagement(assessmentId);

  const overviewCards = [
    {
      title: "Total Responses",
      subTitle: assessmentEngagement
        ? assessmentEngagement?.total_responses.count
        : 0,
      spanText: `+${
        assessmentEngagement
          ? assessmentEngagement?.total_responses.last_24hour
          : 0
      } since yesterday`,
    },
    {
      title: "Conversion rate",
      subTitle: `${
        assessmentEngagement ? assessmentEngagement?.conversion_rate.rate : 0
      }%`,
      status: `${
        assessmentEngagement
          ? assessmentEngagement?.conversion_rate.total_impressions
          : 0
      } Impressions`,
    },
    {
      title: "Last 24 hours",
      subTitle: assessmentEngagement
        ? assessmentEngagement?.last_24hour.count
        : 0,
    },
  ];

  return (
    <Grid container sx={{ gap: "2rem" }}>
      {overviewCards.map((overviewCard, index) => (
        <Grid key={index} item xs={3}>
          <OverviewCard
            key={index}
            title={overviewCard.title}
            subTitle={`${overviewCard.subTitle}`}
            spanText={overviewCard.spanText}
            status={overviewCard.status}
            isLoading={isLoading}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Stats;
