import { Grid, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Grid container>
      <Grid
        xs={12}
        md={8}
        sx={{ height: { xs: "auto", sm: "30.25rem" }, padding: "0.6rem" }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "0.3rem",
            height: "100%",
            width: "100%",
            marginY: "0.6rem",
          }}
        />
      </Grid>
      <Grid
        xs={12}
        md={4}
        sx={{
          height: { xs: "auto", sm: "30.25rem" },
          padding: "0.6rem",
          overflowY: "auto",
          display: { xs: "none", md: "inline-block" },
        }}
      >
        {[1, 2, 3, 4].map((number) => {
          return (
            <Skeleton
              key={number}
              variant="rectangular"
              sx={{
                borderRadius: "0.3rem",
                height: "6rem",
                width: "100%",
                marginY: "0.6rem",
              }}
            />
          );
        })}
      </Grid>
      <Grid xs={12}>
        {[1, 2, 3, 4].map((number) => {
          return (
            <Skeleton
              key={number}
              variant="rectangular"
              sx={{
                borderRadius: "0.3rem",
                height: "5rem",
                width: "100%",
                marginY: "0.6rem",
              }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
