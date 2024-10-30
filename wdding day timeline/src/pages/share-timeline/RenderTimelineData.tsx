import TimelineItem from 'components/common/TimelineItems';
import { Fragment, useEffect } from 'react';
import { getCategories } from 'utils/strings';

export function RenderTimelineData({ heading, isPro, isChecked, setCheck, data, dataTypes, selected, setSelected }) {
  useEffect(() => {
    const vendorsArray: any[] = [];
    const weddingPartyArray: any[] = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].vendor) {
        vendorsArray.push(data[i].vendor.email);
      }
      if (data[i].guest) {
        weddingPartyArray.push(data[i].guest.email);
      }
    }
    if (weddingPartyArray.length) {
      setSelected(weddingPartyArray);
      setCheck(!isChecked);
    }
    if (vendorsArray.length) {
      setSelected(vendorsArray);
      setCheck(!isChecked);
    }
  }, []);

  const handleClicks = () => {
    const vendorsArray: any[] = [];
    const weddingPartyArray: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].vendor) {
        vendorsArray.push(data[i].vendor.email);
      }
      if (data[i].guest) {
        weddingPartyArray.push(data[i].guest.email);
      }
    }
    if (weddingPartyArray.length) {
      setSelected(weddingPartyArray);
      setCheck(!isChecked);
    }
    if (vendorsArray.length) {
      setSelected(vendorsArray);
      setCheck(!isChecked);
    }
    if (isChecked) {
      setSelected([]);
    }
  };
  const getVendorCategory = (arr) => {
    const categoryArr: any[] = [];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index].category_id;
      dataTypes.forEach((item) => {
        if (item.id === element) {
          categoryArr.push(item.label);
        }
      });
    }
    return categoryArr as string[];
  };
  return (
    <div>
      <div className="flex justify-between my-4 sm:mt-4">
        <div>
          <p className="text-purple font-semibold text-w_base xl:text-w_2xl sm:m-1">{heading}</p>
        </div>
        <div
          className={`${
            isPro ? 'cursor-pointer' : ''
          } text-secondary sm:py-2 font-medium text-w_xs1 xl:text-sm sm:mr-11 btn-div`}
        >
          <button disabled={!isPro} onClick={handleClicks} id="select-all-btn" className="select-all-btn">
            {isChecked ? 'Unselect All' : ' Select All'}
          </button>
        </div>
      </div>
      <div className="sm:px-2 py-0 md:gap-4 overflow-y-auto h-[85vh]">
        {data &&
          data.length &&
          data.map(({ vendor, guest, GuestsHasCategories, VendorsHasCategories }, ind) => {
            return (
              <Fragment key={ind}>
                <TimelineItem
                  checkbox={true}
                  id={vendor ? vendor.Id : guest.Id}
                  key={ind}
                  iconClass="bg-azureish_white text-pewter_blue"
                  name={vendor ? vendor.name : [guest.first_name, guest.last_name]}
                  email={vendor ? vendor.email : guest.email}
                  relation={
                    GuestsHasCategories?.length
                      ? getCategories(GuestsHasCategories, dataTypes)
                      : getVendorCategory(VendorsHasCategories)
                  }
                  number={vendor ? vendor.phone : guest.phone}
                  image={vendor ? vendor.picture : guest.picture}
                  checked={isChecked}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default RenderTimelineData;
