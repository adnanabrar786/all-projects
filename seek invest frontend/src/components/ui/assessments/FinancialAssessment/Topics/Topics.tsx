import { Grid, Stack, Typography } from "@mui/material";
import PreferenceTopicsSkeleton from "components/ui/assessments/FinancialAssessment/Topics/Sekeleton/PreferenceTopicsSkeleton";
import SingleTopic from "components/ui/assessments/FinancialAssessment/Topics/SingleTopic";
import TopicsDialog from "components/ui/assessments/FinancialAssessment/Topics/TopicsDialog";
import { EFrameworkType } from "enums/framework";
import useOwnSelectionTopicsData from "hooks/useOwnSelectionTopicsData";
import { ISelectionTopic } from "interfaces/assessment";
import { useState } from "react";

const { CUSTOM, CHILDREN, DIRECT } = EFrameworkType;

const Topics = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { ownSelectionTopics } = useOwnSelectionTopicsData();
  const [topicInfo, setTopicInfo] = useState<ISelectionTopic | null>(null);

  const handleClickOpen = (topicInfo: ISelectionTopic) => {
    setTopicInfo(topicInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredTopics =
    ownSelectionTopics &&
    ownSelectionTopics
      .filter((ownSelectionTopic) => {
        return ownSelectionTopic.parent_id;
      })
      .map((ownSelectionTopic) => {
        ownSelectionTopic.value = "";
        ownSelectionTopic.frameworkType = CUSTOM;

        return ownSelectionTopic;
      });

  return (
    <Stack>
      <Typography
        sx={{
          color: "var(--text-primary)",
          fontSize: "3rem",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "3.75rem",
          letterSpacing: "-0.06rem",
          span: {
            color: "var(--primary)",
          },
        }}
      >
        Select topics that
        <span> you seek to embrace or oppose</span>
      </Typography>

      <Stack
        sx={{
          marginTop: "2rem",
        }}
      >
        <Grid container spacing={3}>
          {filteredTopics ? (
            filteredTopics.map((topic, i) => (
              <SingleTopic
                key={i}
                topic={topic}
                handleClickOpen={handleClickOpen}
              />
            ))
          ) : (
            <PreferenceTopicsSkeleton />
          )}
        </Grid>
      </Stack>

      {/* <Box
        sx={{
          marginTop: "3rem",
          display: "flex",
          gap: "1.5rem",
        }}
      >
        <Link href={FINANCIAL_ASSESSMENT_FRAMEWORK}>
          <FilledButton text="Previous step" />
        </Link>

        <Link href={FINANCIAL_ASSESSMENT_FRAMEWORK_PREFERENCE}>
          <FilledButton text="Proceed" secondary />
        </Link>
      </Box> */}

      {topicInfo && (
        <TopicsDialog
          open={open}
          handleClose={handleClose}
          topicInfo={topicInfo}
        />
      )}
    </Stack>
  );
};

export default Topics;
