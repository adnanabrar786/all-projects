import TextPDFXxs from "components/common/PDF/TextPDF/TextPDFXxs";
import dayjs from "dayjs";

const CopyRightsPDF = () => {
  return (
    <TextPDFXxs
      text={`All rights reserved to SeekInvest ® ${dayjs().year()}`}
      style={{ color: "#667085", marginTop: "32px", textAlign: "center" }}
    />
  );
};

export default CopyRightsPDF;
