import LabelTopTextField from "components/common/Input/LabelTopTextField";

const OpenTextQuestion = () => {
  return (
    <LabelTopTextField
      disabled
      multiline
      rows={5}
      label=""
      placeholder="Response field"
      name="response"
      value=""
      onChange={() => {}}
      sx={{
        marginTop: "1.5rem",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--gray-iron-50)",
          ".Mui-disabled": {
            WebkitTextFillColor: "var(--text-secondary)",
          },
        },
      }}
    />
  );
};

export default OpenTextQuestion;
