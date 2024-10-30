import MenuCard from '@/components/common/Card/MenuCard';
import TextXs from '@/components/common/Text/TextXs';
import { ISecurityTypeField } from '@/interfaces/securities';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ClickAwayListener, Stack, TextField } from '@mui/material';
import { ReactNode, useState } from 'react';

interface Props {
  label: string;
  customIcon?: ReactNode;
  data: ISecurityTypeField[];
  value: string;
  setValue: (value: string) => void;
  error?: boolean;
  helperText?: string;
  showList: boolean;
  setShowList: (value: boolean) => void;
  handleSelect: (val: any) => void;
}

const SearchSecurityType = ({
  label,
  customIcon,
  data,
  value,
  setValue,
  error,
  helperText,
  showList,
  setShowList,
  handleSelect,
}: Props) => {
  const [filterList, setFilteredList] = useState(data);

  const handleSecurityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
    setShowList(true);
    const filteredList = data.filter((type: any) => type.value.toLowerCase().includes(inputValue.toLowerCase()));

    setFilteredList(filteredList);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowList(false)}>
      <Stack sx={{ position: 'relative' }}>
        <Stack>
          <TextField
            size="small"
            id="outlined-basic"
            label={label}
            variant="outlined"
            value={value}
            onChange={handleSecurityTypeChange}
            autoComplete="off"
            error={error}
            helperText={helperText}
            InputProps={{
              endAdornment: (
                <Stack
                  direction={'row'}
                  sx={{
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  {customIcon && (
                    <Stack
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      {customIcon}
                    </Stack>
                  )}
                  <Stack
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowList(!showList)}
                  >
                    {showList ? (
                      <ArrowDropUpIcon
                        sx={{
                          color: '#707070',
                        }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{
                          color: '#707070',
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              ),
            }}
            sx={{
              fieldSet: {
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderWidth: '1px !important',
                color: 'rgba(0, 0, 0, 0.60)',
              },
              fontSize: '0.75rem',
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2196f3',
                  borderWidth: '2px',
                },
              },

              '& .MuiInputLabel-root': {
                color: error ? '#717171' : '#717171',
                '&.Mui-focused': {
                  color: error ? '#717171' : '#2196f3',
                },
              },
            }}
          />
        </Stack>

        {showList && filterList.length > 0 && (
          <MenuCard
            sx={{
              zIndex: '100',
              top: '2.5rem',
              left: '-0.1rem',
              right: '-0.2rem',
              border: '1px solid var(--light-grey-300)',
              padding: '0.87rem 0rem',
              gap: '0.5rem',
              maxHeight: '18.75rem',
              overflowY: 'auto',
              borderRadius: '0.25rem',
              position: 'absolute',
            }}
          >
            {filterList.map((val: any, index: number) => (
              <Stack
                onClick={() => handleSelect(val)}
                key={index}
                sx={{
                  justifyContent: 'center',
                  padding: '0px 10px',
                  cursor: 'pointer',
                }}
              >
                <TextXs
                  sx={{
                    fontSize: '1rem',
                    lineHeight: '150%',
                    letterSpacing: '0.00938rem',
                  }}
                  text={val.value}
                />
              </Stack>
            ))}
          </MenuCard>
        )}
      </Stack>
    </ClickAwayListener>
  );
};

export default SearchSecurityType;