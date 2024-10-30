type Prop = {
  value: string;
  unit: string;
  color: string;
};
export default function TimeUnit({ value, unit, color }: Prop) {
  const formattedValue = value ? String(value).padStart(2, '0') : '00';
  return (
    <div className="col-span-3 sm:col-span-2">
      <span
        className={`border border-${color}-300 rounded-lg text-purple text-w_4xl xl:text-w_5xl text-center font-medium px-2`}
      >
        {formattedValue.slice(0, 1)}
      </span>
      <span
        className={`border border-${color}-300 rounded-lg text-purple ml-1 text-w_4xl xl:text-w_5xl text-center font-medium px-2`}
      >
        {formattedValue.slice(1, 2)}
      </span>
      <p className="font-normal text-w_sm xl:text-w_base ml-2 sm:ml-3 pt-2 text-spanish_grey">{unit}</p>
    </div>
  );
}
