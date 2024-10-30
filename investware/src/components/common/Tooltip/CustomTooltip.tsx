import { SxProps, Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactElement<any, any>;
  title: string | ReactNode;
  arrow?: boolean;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  sx?: SxProps;
  disableHoverListener?: boolean;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--white)',
    borderRadius: '0.25rem',
    color: 'var(--text-black)',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '0.875rem',
    boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    span: { '::before': { backgroundColor: 'var(--text-grey)' } },
    marginTop: '0rem',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
  },
}));

const CustomTooltip = ({ children, title, placement, sx, arrow, disableHoverListener }: Props) => {
  return (
    <>
      <LightTooltip
        disableHoverListener={disableHoverListener}
        title={title}
        placement={placement}
        sx={sx}
        arrow={arrow}
      >
        {children}
      </LightTooltip>
    </>
  );
};

export default CustomTooltip;
