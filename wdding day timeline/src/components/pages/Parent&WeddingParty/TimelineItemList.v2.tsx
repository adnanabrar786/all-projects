import { Category } from '@prisma/client';
import TimelineItem from 'components/common/TimelineItems';
import ShowAppTextOrContent from 'components/common/showTextOrContent';
import { getCategories } from 'utils/strings';

type Prop = {
  guest?;
  vendor?;
  openEditableModal: (value1: string, value2: string, value3: string, guestValue) => void;
  types: Category[];
  text: string[];
};

export default function TimelineItemList({ guest, openEditableModal, types, text, vendor }: Prop) {
  return (
    <ShowAppTextOrContent condition={guest && guest.length <= 0} text="">
      {guest &&
        guest.map((item) => {
          return (
            <TimelineItem
              key={item.guest.email}
              name={[item.guest.first_name, item.guest.last_name]}
              relationClass="w-[100px] sm:w-[300px] md:w-[250px] lg:w-[160px] xl:w-[350px]"
              iconClass="bg-sea_green/50 text-morning_blue"
              email={item.guest.email}
              relation={getCategories(item?.GuestsHasCategories, types)}
              number={item.guest.phone}
              edit={true}
              image={item.guest.picture}
              onClick={() => {
                openEditableModal(text[0], text[1], text[2], item);
              }}
            />
          );
        })}
      {vendor &&
        vendor.map((item) => {
          return (
            <TimelineItem
              key={item.vendor.email}
              name={item.vendor.name ? item.vendor.name : ''}
              iconClass="bg-azureish_white text-pewter_blue"
              email={item.vendor.email}
              relation={getCategories(item.VendorsHasCategories, types)}
              number={item.vendor.phone}
              edit={true}
              image={item.vendor.picture}
              onClick={() => {
                openEditableModal(text[0], text[1], text[2], item);
              }}
            />
          );
        })}
    </ShowAppTextOrContent>
  );
}
