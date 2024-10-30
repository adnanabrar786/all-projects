import { Checkbox, Stack, Typography } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { financialGoal } from "constants/data";
import {
  circleLightGreyCheckboxIcon,
  tickCheckboxCircleIcon,
} from "constants/images.routes";
import Image from "next/image";

const FinancialGoal = () => {
  return (
    <>
      <Stack>
        <Typography
          sx={{
            color: "var(--text-grey)",
            fontSize: "1.5rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "2rem",
            textAlign: "left",
            span: {
              color: "var(--primary)",
            },
          }}
        >
          What is your <span>primary</span> financial goal?
        </Typography>

        {/* <MultiResponseQuestion
          sx={{
            marginTop: "1.5rem",
          }}
        /> */}

        {financialGoal.map((val, index) => (
          <Stack
            key={index}
            direction={"row"}
            sx={{
              marginTop: "1.5rem",
              padding: "0.87rem 1rem",
              backgroundColor: "var(--background-color2)",
              borderRadius: "0.5rem",
              alignItems: "center",
              border: "1px solid var(--gray-200)",
            }}
          >
            <Stack
              sx={{
                backgroundColor: "var(--background-color3)",
                padding: "0.4rem",
                borderRadius: "50%",
                border: "4px solid var(--gray-600)",
                height: "20px",
                width: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                priority
                src={val.icon}
                alt={"icon"}
                width={16}
                height={16}
              />
            </Stack>
            <Stack
              sx={{
                flex: "1",
                marginLeft: "0.88rem",
              }}
            >
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "0.8125rem",
                  fontWeight: "500",
                  fontStyle: "normal",
                  lineHeight: "1.25rem",
                  span: {
                    color: "var(--primary3)",
                  },
                }}
              >
                <span>{val.title}</span> {val.subTitle}
              </Typography>
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                  color: "var(--text-secondary)",
                }}
                text={val.description}
              />
            </Stack>

            <Stack>
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
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default FinancialGoal;
