import { Stack, Typography } from "@mui/material";
import TextLg from "components/common/Text/TextLg";
import TextXs from "components/common/Text/TextXs";
import { EPricePlan } from "enums/enums";
import { PricePlan } from "interfaces/common";
import { IBilling } from "interfaces/user";

interface Props {
  activeButton: string;
  dataPricePlan: PricePlan[];
  stripeProducts: IBilling;
}

const PricingPlanDescription = ({
  activeButton,
  dataPricePlan,
  stripeProducts,
}: Props) => {
  const { monthly, yearly } = stripeProducts;

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          marginTop: "4.56rem",
          backgroundColor: "var(--light-primary)",
          borderRadius: "1rem",
          border: "1px solid var(--light-primary)",
          padding: "1.31rem 0.94rem 0rem 0.94rem",
          display: "flex",
          gap: "0.37rem",
          width: { md: "58rem", xs: "90%" },
          height: " 7.9375rem",
        }}
      >
        <TextLg
          text={
            activeButton === EPricePlan.MONTHLY
              ? dataPricePlan[0].heading
              : dataPricePlan[1].heading
          }
          sx={{
            color: "var(--text-primary)",
            fontSize: "1.125rem",
            fontWeight: "600",
            letterSpacing: "-0.06rem",
            lineHeight: "1.75rem",
            fontStyle: "normal",
          }}
        />

        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: "500",
            fontStyle: "normal",
            color: "var(--text-primary)",
            lineHeight: "1.25rem",

            span: {
              fontSize: "1.875rem",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "2.375rem",
            },
          }}
        >
          <span>
            $
            {activeButton === EPricePlan.MONTHLY
              ? monthly.amount
              : yearly.amount}
          </span>
          {activeButton === EPricePlan.MONTHLY
            ? dataPricePlan[0].pricePara
            : dataPricePlan[1].pricePara}
        </Typography>

        <TextXs
          sx={{
            lineHeight: "1.25rem",
            fontWeight: "500",
          }}
          text={
            activeButton === EPricePlan.MONTHLY
              ? dataPricePlan[0].para
              : dataPricePlan[1].para
          }
        />
      </Stack>
    </>
  );
};

export default PricingPlanDescription;
