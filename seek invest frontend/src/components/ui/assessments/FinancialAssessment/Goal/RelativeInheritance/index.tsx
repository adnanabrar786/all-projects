import { Checkbox, Grid, Stack, Typography } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { financialRelativeData } from "constants/data";
import {
  circleLightGreyCheckboxIcon,
  tickCheckboxCircleIcon,
} from "constants/images.routes";
import Image from "next/image";

const RelativeInheritance = () => {
  return (
    <>
      <Stack
        sx={{
          gap: "0.25rem",
        }}
      >
        <Typography
          sx={{
            color: "var(--text-primary)",
            fontSize: "1.5rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "2rem",
            span: {
              color: "var(--primary2)",
            },
          }}
        >
          A relative left you an inheritance of
          <span> $100,000 </span>
        </Typography>

        <TextXs
          sx={{
            color: "var(--text-secondary)",
            maxWidth: "750px",
          }}
          text="Stipulating in the will that you had to invest all of the money into one of the following choices. Which one would you prefer? "
        />
      </Stack>

      <Grid
        sx={{
          marginTop: "1rem",
        }}
        spacing={2}
        container
      >
        {financialRelativeData.map((item, index) => (
          <Grid key={index} xs={3} item>
            <Stack
              sx={{
                backgroundColor: "var(--background-color2)",
                display: "flex",
                padding: "0.5rem 0.5rem 1.5rem 0.5rem",
                border: "1px solid var(--gray-200)",
                borderRadius: "0.5rem",
              }}
            >
              <Stack
                sx={{
                  alignItems: "flex-start",
                }}
              >
                <Checkbox
                  icon={
                    <Image
                      priority
                      src={circleLightGreyCheckboxIcon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  }
                  checkedIcon={
                    <Image
                      priority
                      src={tickCheckboxCircleIcon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  }
                />
              </Stack>

              <Stack
                sx={{
                  alignItems: "center",
                }}
              >
                <Image
                  priority
                  src={item.image}
                  alt={"icon"}
                  width={102}
                  height={102}
                />
              </Stack>

              <TextXs
                sx={{
                  width: " 9.375rem",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  textAlign: "center",
                }}
                text={item.title}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RelativeInheritance;
