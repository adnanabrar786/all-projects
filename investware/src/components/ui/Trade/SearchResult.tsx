import SearchableInput from '@/components/common/Input/SearchableInput';
import CustomModal from '@/components/common/Modal/CustomModal';
import TextMd from '@/components/common/Text/TextMd';
import { crossIcon, SearchIcon } from '@/constants/images.routes';
import { Trade_List } from '@/constants/locales';
import useSearchTrade from '@/hooks/useSearchTrade';
import { Stack } from '@mui/material';
import Image from 'next/image';

interface Props {
  showSaveResult: boolean;
  setShowSaveResult: (showSaveResult: boolean) => void;
  setSearchTradeId: (value: string) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  setShouldReinitialize: (value: boolean) => void;
  setSelectedAddOnHeading: (value: string) => void;
  setResultSearchShow: (value: boolean) => void;
}

const SearchResult = ({
  showSaveResult,
  setShowSaveResult,
  setSearchTradeId,
  searchValue,
  setSearchValue,
  setShouldReinitialize,
  setSelectedAddOnHeading,
  setResultSearchShow,
}: Props) => {
  const { searchList, isFetching, refetch } = useSearchTrade(searchValue);

  return (
    <CustomModal
      sx={{
        borderRadius: '0.25rem',
        boxShadow:
          '0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.20)',
        width: '100%',
      }}
      showModal={showSaveResult}
      setShowModal={setShowSaveResult}
    >
      <Stack
        sx={{
          width: { md: '37.5rem', xs: '100%' },
        }}
      >
        <Stack
          sx={{
            padding: { md: '1.25rem 2.06rem 1.75rem 1.37rem', xs: '2rem 1.12rem' },
            height: '15rem',
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <TextMd
              text="Search Trades"
              sx={{
                lineHeight: '160%',
                letterSpacing: '0.00938rem',
                fontStyle: '500',
                fontSize: { sm: '1.25rem', xs: '1.1rem' },
              }}
            />
            <Stack
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowSaveResult(false);
              }}
            >
              <Image src={crossIcon} width={16} height={16} alt="icon" />
            </Stack>
          </Stack>

          <Stack
            sx={{
              marginTop: { sm: '1.5rem', xs: '2.5rem' },
            }}
          >
            <SearchableInput
              setResultSearchShow={setResultSearchShow}
              setShowSaveResult={setShowSaveResult}
              setSelectedAddOnHeading={setSelectedAddOnHeading}
              setShouldReinitialize={setShouldReinitialize}
              isFetching={isFetching}
              label={Trade_List.TRADES}
              removeDefaultIcon={true}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              filterInputSearchList={searchList}
              setSearchTradeId={setSearchTradeId}
              refetch={refetch}
              customIcon={
                <>
                  <Image src={SearchIcon} width={20} height={20} alt="icon" />
                </>
              }
              sxTextField={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'rgba(0, 0, 0, 0.60)',
                  },
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default SearchResult;
