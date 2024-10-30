import { Button, MobileStepper, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextXs from "components/common/Text/TextXs";
import PricingPlanDescription from "components/ui/PricingPlan/PricingPlanDescription";
import { dataPricePlan } from "constants/data";
import { EPricePlan } from "enums/enums";
import { IBilling } from "interfaces/user";
import { useState } from "react";
import { userBill } from "services/user.services";

interface Props {
  stripeProducts: IBilling;
}

const PricingPlan = ({ stripeProducts }: Props) => {
  const [activeButton, setActiveButton] = useState<EPricePlan>(
    EPricePlan.MONTHLY
  );
  const [loading, setLoading] = useState(false);
  const { monthly, yearly } = stripeProducts;

  const handleToggle = (button: EPricePlan) => {
    setActiveButton(button);
  };

  const handleUserBill = async () => {
    setLoading(true);

    await userBill(
      activeButton === EPricePlan.MONTHLY ? monthly.id : yearly.id
    );

    setLoading(false);
  };

  return (
    <Stack component={"form"} sx={{ alignItems: "center", width: "100%" }}>
      <Stack
        sx={{
          marginTop: "4.87rem",
          width: "20.396rem",
          height: "3.906rem",
          backgroundColor: "var(--background-color2)",
          borderRadius: "1000rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            width: "19.544rem",
            height: "3.25rem",
            backgroundColor: "var(--background-color2)",
            borderRadius: "62.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            border: "1px solid var(--gray-200)",
            cursor: "pointer",
          }}
        >
          <Button
            onClick={() => handleToggle(EPricePlan.MONTHLY)}
            sx={{
              width: "7.125rem",
              height: "2.75rem",
              border:
                activeButton === EPricePlan.MONTHLY
                  ? "1px solid var(--primary2)"
                  : "1px solid var(--background-color2)",
              borderRadius: "62.5rem",
              fontSize: "0.813rem",
              fontStyle: "normal",
              lineHeight: "1.25rem",
              fontWeight: "600",
            }}
          >
            Monthly
          </Button>

          <Button
            onClick={() => handleToggle(EPricePlan.YEARLY)}
            sx={{
              height: "2.75rem",
              border:
                activeButton === EPricePlan.YEARLY
                  ? "1px solid var(--primary2)"
                  : "1px solid var(--background-color2)",
              borderRadius: "62.5rem",
              fontSize: "0.813rem",
              fontStyle: "normal",
              lineHeight: "1.25rem",
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
            endIcon={
              <TextXs
                text="Save 2 months"
                sx={{
                  height: "100%",
                  fontSize: "0.813rem !important",
                  marginLeft: "1.41rem",
                  padding: "0.4rem 0.5rem",
                  backgroundColor: "var(--light-primary)",
                  color: "var(--background-color2)",
                  borderRadius: "62.5rem",
                }}
              />
            }
          >
            Yearly
          </Button>
        </Stack>
      </Stack>

      <PricingPlanDescription
        activeButton={activeButton}
        dataPricePlan={dataPricePlan}
        stripeProducts={stripeProducts}
      />

      <FilledButton
        disabled={loading}
        loading={loading}
        onClick={handleUserBill}
        text="Continue"
        sx={{ marginTop: "2.5rem", marginBottom: "1.9rem" }}
      />

      <MobileStepper
        backButton={null}
        nextButton={null}
        variant="dots"
        steps={3}
        position="static"
        activeStep={2}
        sx={{
          marginBottom: "1.9rem",
          background: "transparent",
          ".MuiMobileStepper-dotActive": {
            bgcolor: "var(--color-text-text, #344054)",
          },
        }}
      />
    </Stack>
  );
};

export default PricingPlan;
