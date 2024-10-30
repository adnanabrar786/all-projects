import { Grid, Skeleton, Stack } from "@mui/material";

const ClientsOverviewSkeleton = () => {
  return Array.from({ length: 4 }).map((val, i) => (
    <Grid
      container
      key={i}
      sx={{
        alignItems: "center",
        padding: "0.63rem",
        height: "5.5rem",
        backgroundColor: "var(--ghost-white)",
        mt: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <Grid item xs={3}>
        <Stack sx={{ gap: "0.25rem", width: "80%" }}>
          <Skeleton sx={{ height: "1rem" }} />
          <Skeleton sx={{ height: "1rem" }} />
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Skeleton sx={{ height: "1.25rem", width: "80%" }} />
      </Grid>
      <Grid item xs={2}>
        <Skeleton sx={{ height: "1.25rem", width: "80%" }} />
      </Grid>
      <Grid item xs={3.5}>
        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", columnGap: "0.55rem", width: "80%" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} sx={{ height: "1.25rem", width: "30%" }} />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={1.5}>
        <Skeleton sx={{ height: "2rem", width: "80%" }} />
      </Grid>
    </Grid>
  ));
};

export default ClientsOverviewSkeleton;
