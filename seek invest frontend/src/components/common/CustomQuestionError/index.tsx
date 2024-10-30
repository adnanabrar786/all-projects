import TextXs from "components/common/Text/TextXs";

interface Props {
  error: string;
}

const CustomQuestionError = ({ error }: Props) => {
  return (
    <>
      {error && (
        <TextXs text={error} sx={{ color: "red", marginTop: "0.5rem" }} />
      )}
    </>
  );
};

export default CustomQuestionError;
