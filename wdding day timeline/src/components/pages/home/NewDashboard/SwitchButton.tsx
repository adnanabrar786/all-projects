import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled, SxProps } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32.5,
  height: 16,
  padding: 3,
  '&.MuiFormControlLabel-root': {
    marginLeft: 0,
    marginRight: 0,
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 'auto',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#2196F3',
      '& .MuiSwitch-thumb': {
        color: '#2196F3',
      },
      '& + .MuiSwitch-track': {
        border: 0,
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '#90bbf7',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#90bbf7',
      border: '6px solid #2196F3',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 14,
    height: 14,
    margin: '1px 2px',
    color: '#B0B0B0',
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#39393D',
    border: '0.5px solid #B0B0B0',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)({
  '&.MuiFormControlLabel-root': {
    marginLeft: 0,
    marginRight: 0,
  },
});

type Props = {
  value: boolean;
  disabled?: boolean;
  switchHandler: any;
  sx?: SxProps;
};

export default function SwitchButton({ switchHandler, value, disabled, sx }: Props) {
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
        label=""
      />
    </FormGroup>
  );
}
