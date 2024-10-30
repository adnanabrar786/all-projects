import { Modal } from '@mui/material';
import { memo } from 'react';
import { GrClose } from 'react-icons/gr';

type Props = {
  open: boolean;
  children: JSX.Element;
  onClose?: () => void;
  className?: any;
};

const AppModal = ({ open, onClose, children, className }: Props) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div className={className}>
        <div className="w-full flex justify-end">
          <div className="mx-5 my-6 text-xl cursor-pointer" onClick={onClose}>
            <GrClose />
          </div>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default memo(AppModal);
