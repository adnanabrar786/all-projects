type Props = {
  form: JSX.Element | JSX.Element[];
};
const LayoutNewOnBoarding = ({ form }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-5 col">{form}</div>
    </div>
  );
};

export default LayoutNewOnBoarding;
