import { TickCheckboxIcon } from "constants/images.routes";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 2000,
        icon: (
          <Image
            priority
            src={TickCheckboxIcon}
            alt={"icon"}
            width={20}
            height={20}
          />
        ),
      }}
    />
  );
};

export default CustomToaster;
