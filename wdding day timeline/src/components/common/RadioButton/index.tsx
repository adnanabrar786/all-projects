import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { IRadioButton } from 'interfaces/forms';
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
export function RadioButtons({ name, value, onChange, list, disabled, error, defaultValue }: props) {
  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={value}
          defaultValue={defaultValue}
          name={name}
        >
          <div className="inline-block  text-purple text-w_xs1 xl:text-sm">
            {list.map((item) => {
              return (
                <FormControlLabel
                  key={item.id}
                  value={item.label}
                  onChange={onChange}
                  disabled={disabled}
                  // defaultValue={defaultValue}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontFamily: 'poppins',
                      fontSize: { xs: '0.688rem', xl: '0.886rem' },
                      padding: { xs: '0.5rem 0rem', lg: '0rem' },
                    },
                  }}
                  control={
                    <Radio
                      sx={{
                        '&, &.Mui-checked': {
                          color: error ? '#F59144' : '#512F6F',
                        },
                      }}
                    />
                  }
                  label={item.label}
                />
              );
            })}
          </div>
        </RadioGroup>
      </FormControl>
    </>
  );
}
