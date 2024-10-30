import FilledButton from "components/common/Button/FilledButton";
import { FilterIcon } from "constants/images.routes";
import Image from "next/image";

const Filter = () => {
  return (
    <>
      <FilledButton
        text="Filter"
        secondary
        startIcon={
          <Image
            className="filter icon"
            priority
            src={FilterIcon}
            alt={"icon"}
            width={20}
            height={21}
          />
        }
      />
    </>
  );
};

export default Filter;
