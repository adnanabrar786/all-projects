import DeleteCardDesktop from './GuestVendorCardDeleteDesktop';
import DeleteCardMobile from './GuestVendorCardDeleteMobile';

interface Props {
  onClick?: () => void;
  handleDelete?: any;
  text?: string;
  cancelBtn?: string;
  deleteBtn?: string;
  setDeleteBox?: (val: boolean) => void;
  deleteGuestLoading?: boolean;
}

const GuestVendorCardDelete = ({
  onClick,
  handleDelete,
  text,
  cancelBtn,
  deleteBtn,
  setDeleteBox,
  deleteGuestLoading,
}: Props) => {
  return (
    <>
      <DeleteCardDesktop
        text={text}
        handleDelete={handleDelete}
        cancelBtn={cancelBtn}
        deleteBtn={deleteBtn}
        setDeleteBox={setDeleteBox}
        deleteGuestLoading={deleteGuestLoading}
      />
      <DeleteCardMobile
        text={text}
        handleDelete={handleDelete}
        cancelBtn={cancelBtn}
        deleteBtn={deleteBtn}
        setDeleteBox={setDeleteBox}
        deleteGuestLoading={deleteGuestLoading}
      />
    </>
  );
};

export default GuestVendorCardDelete;
