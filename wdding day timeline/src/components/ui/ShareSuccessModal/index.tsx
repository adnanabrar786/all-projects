import AppModal from 'components/common/AppModal';
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { AppText } from 'utils/enums/text';
type TLoginModal = {
  open: boolean;
  handleClose: () => void;
};

const ShareSuccessModal = ({ open, handleClose }: TLoginModal) => {
  return (
    <>
      <AppModal
        open={open}
        onClose={handleClose}
        className="absolute rounded-3xl top-[50%] left-[50%] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] -translate-x-1/2 -translate-y-1/2 block pb-20 overflow-auto bg-white outline-none overflow-y-auto "
      >
        <div className="flex flex-col justify-center h-full">
          <div className="flex justify-center w-full px-6">
            <Image src="/images/email-icon.png" width={104} height={85} alt="email-icon" />
          </div>
          <div className=" w-full px-6">
            <p className="text-xl xl:text-2xl  text-center my-5 text-purple">
              {SUCCESS_MESSAGES.EMAIL_SUCCESSFULLY_SENT}
            </p>
            <p className="text-w_sm1 xl:text-base text-center text-purple mb-3">
              {AppText.MESSAGE_SENT_TO_ALL_RECIPIENTS}
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <div
              className="flex justify-center cursor-pointer bg-secondary text-white rounded-full p-2 w-48 relative"
              onClick={() => {
                handleClose();
              }}
            >
              <span className="text-w_sm1 xl:text-base">{AppText.OK}</span>
              <span className="flex justify-end absolute right-2 top-[10px] ">
                <HiArrowNarrowRight className="text-xl mr-2" />
              </span>
            </div>
          </div>
        </div>
      </AppModal>
    </>
  );
};
export default ShareSuccessModal;
