import { Checkbox, Stack, Typography } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { bonusData } from "constants/data";
import {
  circleLightGreyCheckboxIcon,
  tickCheckboxCircleIcon,
} from "constants/images.routes";
import Image from "next/image";

const Bonus = () => {
  return (
    <Stack
      sx={{
        gap: "2rem",
      }}
    >
      <Stack>
        <Typography
          sx={{
            color: "var(--text-primary)",
            fontSize: "1.5rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "2rem",
            span: {
              color: "var(--primary)",
            },
          }}
        >
          You received a bonus of <span> $100,000</span> and want to invest.
        </Typography>
        <TextXs
          sx={{
            color: "var(--text-secondary)",
            lineHeight: "1.5rem",
            maxWidth: "700px",
          }}
          text="Given the best and worst case returns of the four investment choices below, which would you prefer over the course of a one-year period?"
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          gap: "1.56rem",
          justifyContent: "space-between",
        }}
      >
        {bonusData.map((bonus, i) => (
          <Stack
            key={i}
            sx={{
              width: "11.375rem",
              height: "100%",
              backgroundColor: "var(--background-color2)",
              borderRadius: "0.5rem",
              border: "1px solid var(--gray-200)",
            }}
          >
            <Stack
              sx={{
                alignItems: "flex-end",
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

            <Stack sx={{ gap: "0.5rem" }}>
              {bonus.items.map((item, index) => (
                <Stack
                  key={index}
                  sx={{
                    padding: " 0 0 0.5rem 1.5rem",
                    borderBottom:
                      index !== bonus.items.length - 1
                        ? "1px dashed var(--gray-100)"
                        : "none",
                  }}
                >
                  <TextXs
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: "400",
                      fontStyle: "normal",
                      lineHeight: "1.125rem",
                      color: "var(--text-secondary)",
                    }}
                    text={item.title}
                  />
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <TextMd
                      sx={{
                        lineHeight: "1.75rem",
                        color: "var(--text-primary)",
                      }}
                      text={item.bonus}
                    />
                    <Stack
                      sx={{
                        backgroundColor: "var(--background-color4)",
                        padding: "0.125rem 0.5rem 0.125rem 0.375rem",
                        gap: "0.5rem",
                        borderRadius: "1rem",
                      }}
                    >
                      {item.icon && (
                        <Image
                          priority
                          src={item.icon}
                          alt={"icon"}
                          width={28}
                          height={28}
                        />
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Bonus;
