import { Grid, Skeleton, Stack } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import TextMd from "components/common/Text/TextMd";
import Categories from "components/ui/assessments/NewFHA/Categories";
import Search from "components/ui/assessments/NewFHA/Search";
import Templates from "components/ui/assessments/NewFHA/Templates";
import useAssessmentData from "hooks/useAssessmentData";

interface Props {
  category: string;
}

const NewFHA = ({ category }: Props) => {
  const { newAssessments } = useAssessmentData();

  return (
    <Stack>
      <TextMd
        text="Financial HarMoney®  Assessments"
        sx={{ padding: "1.85rem 0 1.15rem 2rem", fontWeight: "700" }}
      />

      <CustomDivider />

      <Grid
        maxWidth={"xl"}
        spacing={5}
        container
        sx={{ paddingX: "2rem", paddingTop: "2.51rem" }}
      >
        <Grid item md={2}>
          {newAssessments ? (
            <Categories assessments={newAssessments} />
          ) : (
            <Stack sx={{ gap: "1rem" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <Skeleton
                  key={index}
                  sx={{ height: "2.5rem", transform: "none" }}
                />
              ))}
            </Stack>
          )}
        </Grid>

        <Grid item md={10}>
          <Search />

          <Templates newAssessments={newAssessments} category={category} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default NewFHA;
