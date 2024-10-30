import { IOSSwitch, StyledFormControlLabel } from '@/components/common/SwitchButton/SwitchButtonStyled';
import FormGroup from '@mui/material/FormGroup';
import { SxProps } from '@mui/material/styles';

type Props = {
  value?: boolean;
  disabled?: boolean;
  switchHandler: any;
  sx?: SxProps;
  label?: string;
};

export default function SwitchButton({ switchHandler, value, disabled, sx, label }: Props) {
  return (
    <FormGroup>
      <StyledFormControlLabel
        disabled={disabled}
        control={
          <IOSSwitch
            sx={{
              m: 1,
              ...sx,
            }}
            onChange={switchHandler}
            value={value}
            checked={value}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
