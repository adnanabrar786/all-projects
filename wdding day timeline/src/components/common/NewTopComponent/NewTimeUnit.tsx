type Prop = {
  value: string;
  unit: string;
  color: string;
};
export default function NewTimeUnit({ value, unit, color }: Prop) {
  const formattedValue = value ? String(value).padStart(2, '0') : '00';
  const customBorderStyle = {
    borderColor: color,
  };
  return (
    <div className="col-span-3 sm:col-span-3 justify-center ">
      <span
        style={customBorderStyle}
        className={`border border-${color}-300 rounded-[8px] text-purple text-[11px] text-center font-medium px-2 py-1 w-[21px] h-[23]`}
      >
        {formattedValue.slice(0, 1)}
      </span>
      <span
        style={customBorderStyle}
        className={`ml-2 border border-${color}-300 rounded-[8px] text-purple text-[11px] text-center font-medium px-2 py-1 w-[21px] h-[23]`}
      >
        {formattedValue.slice(1, 2)}
      </span>
      <p className="font-normal text-[11px] pt-2 text-[#333333B2] text-left ml-3">{unit}</p>
    </div>
  );
}
