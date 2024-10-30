import { Skeleton } from "@mui/material";

const DefaultQuestionsSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </>
  );
};

export default DefaultQuestionsSkeleton;
