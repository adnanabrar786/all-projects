import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { TimelineEventType } from 'utils/enums';

interface AutocompleteData {
  title?: string;
  inputValue?: string;
}

const filter = createFilterOptions<AutocompleteData>();
type Props = {
  disabled?: boolean;
  predefinedVal?: string;
  data?: AutocompleteData[];
  setSelected: (val: boolean) => void;
  setEvent: (val: any) => void;
};
export default function CreatableAutocomplete({ data, setSelected, setEvent, predefinedVal, disabled = false }: Props) {
  const [value, setValue] = useState<{ title: string; event_type: TimelineEventType } | null>(null);

  return (
    <Autocomplete
      disabled={disabled}
      value={predefinedVal ? predefinedVal : value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(event, newValue: any) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
            event_type: TimelineEventType.CUSTOM,
          });
          setEvent({
            event_name: newValue,
            event_type: TimelineEventType.CUSTOM,
          });
          setSelected(true);
        } else if (newValue && newValue.inputValue) {
          setSelected(true);
          setValue({
            title: newValue.inputValue,
            event_type: TimelineEventType.CUSTOM,
          });
          setEvent({
            event_name: newValue.inputValue,
            event_type: TimelineEventType.CUSTOM,
          });
        } else {
          if (newValue && newValue.type === TimelineEventType.CUSTOM) {
            setSelected(true);
          } else {
            setSelected(false);
          }
          if (newValue) {
            setValue(newValue);
            setEvent({
              event_name: newValue?.title,
              event_type: newValue?.type,
            });
          }
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="select-event"
      options={data && data.length ? data : []}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{
        width: '100%',
        height: '90%',
        [`& fieldset`]: {
          borderRadius: 35,
          marginLeft: 1,
          height: '100%',
        },
        '& .css-1q60rmi-MuiAutocomplete-endAdornment': {
          top: 'calc(45% - 13px) !important ',
        },
      }}
      freeSolo
      renderInput={(params) => <TextField {...params} placeholder="" style={{ height: '90%' }} />}
    />
  );
}
