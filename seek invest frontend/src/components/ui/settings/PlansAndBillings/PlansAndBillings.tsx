import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextLg from "components/common/Text/TextLg";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { useState } from "react";
import { subscription } from "services/user.services";

const PlansAndBillings = () => {
  const [loading, setLoading] = useState(false);

  const makeSubscription = async () => {
    setLoading(true);
    const res = await subscription();
    if (res.data && res.data.data) {
      window.open(res.data.data.url, "_blank");
    }
    setLoading(false);
  };

  return (
    <>
      <TextLg
        text="Plan and Billing"
        sx={{
          fontSize: "3rem",
          lineHeight: "3.75rem",
          letterSpacing: "-0.06rem",
          fontWeight: "400",
        }}
      />

      <Stack sx={{ mt: "2.5rem", alignItems: "flex-start" }}>
        <TextMd text="Manage Subscription" sx={{ lineHeight: "1.75rem" }} />
        <TextXs
          text="Change your billing details and cancel your subscription anytime you want."
          sx={{ lineHeight: "1.25rem", color: "var(--text-secondary)" }}
        />
        <FilledButton
          onClick={makeSubscription}
          disabled={loading}
          loading={loading}
          secondary
          text="Manage Subscription"
          sx={{ mt: "1.5rem" }}
        />
      </Stack>
    </>
  );
};

export default PlansAndBillings;
