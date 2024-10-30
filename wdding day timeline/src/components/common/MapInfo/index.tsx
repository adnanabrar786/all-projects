interface DataArray {
  id: number;
  name: string;
  address: string;
  person?: string;
  address_name: string;
  couple_name?: string;
  type?: string;
}
type Props = {
  dataArray: DataArray[];
  setGetLocation: (value: any) => void;
};
const MapInfo = ({ dataArray, setGetLocation }: Props) => {
  return (
    <>
      {dataArray.map((item, index) => {
        return (
          <div key={index} onClick={() => setGetLocation(item)}>
            <div className="px-5 py-2 xl:py-4 my-7 mr-[15px] border-2 hover:border-2 border-gray-200 hover:border-secondary/60  rounded-lg cursor-pointer">
              <div>
                <p className="flex items-center text-w_base1 xl:text-w_3xl mb-4 text-purple font-semibold">
                  {item.type && item.couple_name
                    ? item.couple_name.charAt(0).toUpperCase() + item.couple_name.slice(1) + ' ' + item.type
                    : item.type
                      ? item.type
                      : item.name}
                </p>
              </div>
              <div className="mt-0 text-purple/80 font-medium text-w_xs1 xl:text-w_0xl ">
                <p>{item.address_name ? item.address_name : ''}</p>
                {/* #TODO the old values*/}
                {/* <p>{`${item.couple_name && item.type ? '' : ''} ${item.type ? item.type : ''} ${item.person}`}</p> */}
                <p>{item.address_name ? item.address_name + ', ' + item.address : item.address}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MapInfo;
