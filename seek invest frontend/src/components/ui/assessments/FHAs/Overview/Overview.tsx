import { Stack } from "@mui/material";
import Questions from "components/ui/assessments/FHAs/Overview/Questions/Questions";
import Stats from "components/ui/assessments/FHAs/Overview/Stats";

const Overview = () => {
  return (
    <Stack
      sx={{ paddingTop: "2.56rem", paddingX: "2rem", paddingLeft: "3.69rem" }}
    >
      <Stats />

      <Questions />
    </Stack>
  );
};

export default Overview;
