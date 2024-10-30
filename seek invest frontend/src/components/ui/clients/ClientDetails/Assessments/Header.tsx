import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextMd from "components/common/Text/TextMd";
import SendAssessment from "components/ui/clients/ClientDetails/Assessments/SendAssessment";
import { useState } from "react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <TextMd text="Assessment History" sx={{ fontWeight: "700" }} />
      <FilledButton onClick={() => setShowModal(true)} text="Send assessment" />
      <SendAssessment showModal={showModal} setShowModal={setShowModal} />
    </Stack>
  );
};

export default Header;
