import AppModal from 'components/common/AppModal';
import Link from 'next/link';
import { ROOT_URL } from 'routes';
type TModal = {
  open: boolean;
  handleClose: () => void;
  days: number;
};

const CancelMonthlyModal = ({ open, handleClose, days }: TModal) => {
  return (
    <AppModal open={open} onClose={handleClose}>
      <div className="absolute rounded-3xl top-[50%] left-[50%] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] -translate-x-1/2 -translate-y-1/2 flex pb-10 overflow-auto bg-white outline-none overflow-y-auto h-[50%] sm:h-[30%] items-center">
        <div className="absolute top-2 right-2">
          <div className="mx-5 my-6 text-xl cursor-pointer" onClick={handleClose}>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 17.9766L1 1.97659M17 1.97656L1.00002 17.9766"
                stroke="#A695B5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="text-center m-auto">
          <p className="font-[Open Sans] text-w_5xl text-purple font-[600] mt-10">Subscription Cancelled</p>
          <p className="text-w_base mx-3 sm:w-5/6 sm:mx-auto my-6 text-purple">
            You’ve cancelled your Pro plan. You can enjoy pro plan for the remaining {days}{' '}
            {days === 1 ? 'day' : 'days'} of your monthly plan days.
          </p>
          <Link href={ROOT_URL}>
            <div className="flex justify-center items-center">
              <p className="text-base bg-secondary text-white rounded-full cursor-pointer font-semibold px-8 py-2">
                Back To Dashboard
              </p>
            </div>
          </Link>
        </div>
      </div>
    </AppModal>
  );
};
export default CancelMonthlyModal;
