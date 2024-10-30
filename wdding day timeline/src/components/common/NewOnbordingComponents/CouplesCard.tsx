import { Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { IRadioButton } from 'interfaces/forms';
import Image from 'next/image';
import { SyntheticEvent } from 'react';

type props = {
  name: string;
  value?: string | number;
  list: IRadioButton[];
  disabled?: boolean;
  error?: boolean;
  onChange: (event: SyntheticEvent, checked?: boolean) => void;
  defaultValue?: string | number;
};

const CouplesCard = ({ name, value, onChange, list, disabled, error, defaultValue }: props) => {
  return (
    <Stack
      sx={{
        gap: '0.5rem',
        width: '100%',
      }}
    >
      {list.map((item, index) => {
        return (
          <Stack
            direction={'row'}
            key={index}
            sx={{
              justifyContent: 'space-between',
              boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12)',
              borderRadius: '0.5rem',
              '.MuiFormControl-root': {
                width: '100%',
              },
              '.MuiFormControlLabel-root': {
                width: '100%',
                '.MuiTypography-root': {
                  width: '100%',
                },
              },
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                defaultValue={defaultValue}
                name={name}
              >
                <div className="inline-block  text-purple text-w_xs1 xl:text-sm">
                  <FormControlLabel
                    key={item.id}
                    value={item.label}
                    onChange={onChange}
                    disabled={disabled}
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontFamily: 'poppins',
                        fontSize: { xs: '0.688rem', xl: '0.886rem' },
                      },
                    }}
                    control={
                      <Radio
                        disableRipple
                        sx={{
                          '&, &.Mui-checked': {
                            color: error ? '#F59144' : '#00000066',
                          },
                          color: 'red',
                          padding: '0.875rem 0.5rem 0.875rem 1.3rem',
                        }}
                      />
                    }
                    label={
                      <Stack
                        direction={'row'}
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.875rem 0rem 0.875rem 0rem',
                        }}
                      >
                        <Typography
                          sx={{
                            color: '#000000',
                            fontSize: '1rem',
                            fontWeight: '600',
                            opacity: '80%',
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Image src={item.img!} alt="dress" width={50} height={50} />
                      </Stack>
                    }
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CouplesCard;
