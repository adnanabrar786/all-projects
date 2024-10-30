import { TextareaAutosize as TextareaAutosave } from '@mui/material';
import AppModal from 'components/common/AppModal';
import { AppText, ButtonText } from 'utils/enums/text';

type TModal = {
  open: boolean;
  text: string;
  handleClose: () => void;
  ShareButtonClick(): void;
  setText(str: string): void;
};

const ShareTimelineModal = ({ open, text, setText, handleClose, ShareButtonClick }: TModal) => {
  return (
    <AppModal
      open={open}
      onClose={handleClose}
      className="absolute rounded-3xl top-[50%] left-[50%] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] -translate-x-1/2 -translate-y-1/2 block pb-10 overflow-auto bg-white outline-none overflow-y-auto h-[80%] sm:h-[85%]"
    >
      {/* Modal Content */}
      <div>
        <div className="flex flex-col items-center justify-center mx-6">
          <p className="text-w_3xl1 xl:text-w_5xl font-[500] text-purple">{AppText.SHARE_YOUR_FINAL_TIMELINE}</p>
        </div>
        <div className="flex flex-col items-center justify-center m-6 mt-1">
          <p className="text-center  text-w_sm1 xl:text-w_0xl text-purple">{AppText.EMAIL_TEXT_YOUR_FINAL_TIMELINE}</p>
        </div>

        <div className="border-2 border-gray-200 rounded-xl mt-1 m-6 max-h-[500px] text-purple p-4">
          <div className="font-medium ">
            <div className="text-sm font-medium text-gray-400 sm:text-base">
              <p className="mb-2 mt-4 italic font-[500] text-w_sm1 xl:text-w_0xl">[{AppText.EDITABLE_TEMPLATE}]</p>
            </div>
            <div className="mb-3">
              <TextareaAutosave
                id="message"
                name="message"
                minRows={5}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                style={{
                  display: 'block',
                  padding: '4px',
                  width: '100%',
                  maxHeight: '310px',
                  fontWeight: 500,
                  marginTop: '20px',
                  marginBottom: '8px',
                  overflow: 'auto',
                  fontSize: '14px',
                }}
                className="focus:outline-0 text-purple "
                defaultValue={text}
              ></TextareaAutosave>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 px-8 pb-1 mt-8 sm:grid-cols-2">
          <div
            className="w-full border-2 order-2 sm:order-1 rounded-full h-9 xl:h-11 text-secondary cursor-pointer  bg-white flex justify-center items-center font-medium "
            onClick={handleClose}
          >
            {ButtonText.CANCEL}
          </div>

          <div
            className="w-full order-1 sm:order-2 sm:ml-2 border-2 rounded-full h-9 xl:h-11 flex items-center justify-center font-medium text-white cursor-pointer  bg-secondary"
            onClick={ShareButtonClick}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.4309 3.82488L8.28826 10.9675C8.50007 11.2708 8.68015 11.5983 8.82477 11.9454L10.6069 16.2366L15.4309 3.82395V3.82488ZM7.03141 9.7107L14.175 2.5671L1.76235 7.39108L6.05355 9.17418C6.398 9.31703 6.72588 9.49693 7.03141 9.7107ZM17.8718 2.37489L12.2482 16.8431C11.8936 17.7575 10.8701 18.2269 9.96312 17.8919C9.7422 17.8102 9.54054 17.6838 9.37082 17.5205C9.20109 17.3572 9.06697 17.1606 8.97687 16.9429L7.1947 12.6517C6.84793 11.8155 6.18347 11.151 5.34722 10.8043L1.05509 9.02209C0.164935 8.65166 -0.241885 7.62249 0.14814 6.72114C0.243773 6.5009 0.382052 6.30176 0.555006 6.13522C0.727959 5.96867 0.932167 5.838 1.15586 5.75074L15.6241 0.125252C15.9384 -0.00143742 16.2831 -0.0328772 16.6153 0.0348459C16.9474 0.102569 17.2522 0.266465 17.4919 0.506135C17.7316 0.745805 17.8955 1.05067 17.9632 1.38278C18.0309 1.71489 17.9995 2.05958 17.8728 2.37396L17.8718 2.37489Z"
                fill="white"
              />
            </svg>
            <span className="mx-5"> {ButtonText.SEND_TIMELINE} </span>
          </div>
        </div>
      </div>
    </AppModal>
  );
};
export default ShareTimelineModal;
