import { memo } from 'react';

type TButton = {
  id?: string;
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: JSX.Element | string;
  type?: 'submit' | 'reset' | 'button';
};

const Button = ({ id = '', text, onClick, children, disabled = false, className = '', type = 'button' }: TButton) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-secondary  text-white rounded-full text-w_xs1 xl:text-sm ${className}`}
    >
      {children} {text}
    </button>
  );
};

export default memo(Button);
