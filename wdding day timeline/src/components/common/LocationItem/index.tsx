type Prop = {
  name: string;
  type: string;
  address: string;
};

export default function LocationItem({ name, address, type }: Prop) {
  return (
    <div
      className="flex gap-3 drop-shadow-lg bg-white rounded-lg pt-4 pb-10 px-2 lg:px-4 min-w-[150px]"
      id={name + '_' + address + '_' + type}
    >
      <div className="text-purple">
        <p className="font-semibold mb-2">{name}</p>
        <p>{type}</p>
        <p>{address}</p>
      </div>
    </div>
  );
}
