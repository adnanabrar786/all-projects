import MenuCard from '@/components/common/Card/MenuCard';
import TextXs from '@/components/common/Text/TextXs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ClickAwayListener, Stack, SxProps, TextField } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  label: string;
  customIcon?: ReactNode;
  removeDefaultIcon?: boolean;
  filterInputSearchList: any[] | null;
  sxTextField?: SxProps;
  searchValue: string;
  setSearchValue: (value: string) => void;
  isFetching?: boolean;
  refetch: () => {};
  setSearchTradeId: (value: string) => void;
  setShouldReinitialize: (value: boolean) => void;
  setSelectedAddOnHeading: (value: string) => void;
  setShowSaveResult: (value: boolean) => void;
  setResultSearchShow: (value: boolean) => void;
}

const SearchableInput = ({
  label,
  customIcon,
  removeDefaultIcon,
  filterInputSearchList,
  sxTextField,
  searchValue,
  setSearchValue,
  isFetching,
  setSearchTradeId,
  refetch,
  setShouldReinitialize,
  setSelectedAddOnHeading,
  setShowSaveResult,
  setResultSearchShow,
}: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const [isTyping, setIsTyping] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filteredList, setFilteredList] = useState<any[]>([]);

  const handleInputChange = useDebouncedCallback(async (searchValue: string) => {
    if (searchValue) {
      const searchWords = searchValue.trim().toLowerCase().split(/\s+/);

      const filteredList =
        filterInputSearchList?.filter((item: any) => {
          const itemName = item.name.toLowerCase();
          return searchWords.every((word) => itemName.includes(word));
        }) || [];

      setFilteredList(filteredList);
      setIsTyping(false);
      setShowList(filteredList.length > 0);
    }
  }, 500);

  const handleSelect = ({ name, id, type }: { name: string; id: string; type: string }) => {
    setSearchTradeId(id);
    setShowList(false);
    setShouldReinitialize(true);
    setShowSaveResult(false);
    setResultSearchShow(true);
    setSearchValue('');
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
            value={searchValue}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearchValue(inputValue);
              setIsTyping(true);
              handleInputChange(inputValue);
              setShowList(inputValue.trim() !== '');
            }}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <Stack direction={'row'} sx={{ alignItems: 'center', gap: '0.45rem' }}>
                  {customIcon && (
                    <Stack sx={{ cursor: 'pointer' }} onClick={() => setShowList(!showList)}>
                      {customIcon}
                    </Stack>
                  )}
                  {!removeDefaultIcon && (
                    <Stack sx={{ cursor: 'pointer' }} onClick={() => setShowList(!showList)}>
                      {showList ? (
                        <ArrowDropUpIcon sx={{ color: '#707070' }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: '#707070' }} />
                      )}
                    </Stack>
                  )}
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
                '&.Mui-focused': {
                  color: '#2196f3',
                  borderWidth: '2px',
                },
              },
              ...sxTextField,
            }}
          />
        </Stack>

        {showList && filteredList?.length > 0 ? (
          <MenuCard
            sx={{
              zIndex: '100',
              top: '2.5rem',
              left: '-0.1rem',
              right: '-0.2rem',
              border: '1px solid var(--light-grey-300)',
              padding: '0.87rem 0rem',
              gap: '0.5rem',
              overflowY: 'auto',
              borderRadius: '0.25rem',
              position: 'absolute',
              maxHeight: '7rem',
              height: 'auto',
              overflow: 'auto',
            }}
          >
            {filteredList.map((val: any, index) => (
              <Stack
                key={index}
                onClick={() => handleSelect({ name: val.name, id: val.id, type: val.request.add_ons_value.type })}
                sx={{ justifyContent: 'center', padding: '0px 10px', cursor: 'pointer' }}
              >
                <TextXs
                  sx={{
                    fontSize: '1rem',
                    lineHeight: '150%',
                    letterSpacing: '0.00938rem',
                  }}
                  text={val.name}
                />
              </Stack>
            ))}
          </MenuCard>
        ) : (
          <>
            {!isFetching && (
              <MenuCard
                sx={{
                  zIndex: '100',
                  top: '2.5rem',
                  left: '-0.1rem',
                  right: '-0.2rem',
                  border: '1px solid var(--light-grey-300)',
                  padding: '0.87rem 0rem',
                  gap: '0.5rem',
                  overflowY: 'auto',
                  borderRadius: '0.25rem',
                  position: 'absolute',
                  maxHeight: '7rem',
                  height: 'auto',
                  overflow: 'auto',
                  display: searchValue ? 'flex' : 'none',
                }}
              >
                <Stack sx={{ padding: '0px 10px' }}>
                  <TextXs
                    sx={{
                      fontSize: '1rem',
                      lineHeight: '150%',
                      letterSpacing: '0.00938rem',
                    }}
                    text={isTyping || isFetching ? 'Searching...' : 'No Trade Found'}
                  />
                </Stack>
              </MenuCard>
            )}
          </>
        )}
      </Stack>
    </ClickAwayListener>
  );
};

export default SearchableInput;
