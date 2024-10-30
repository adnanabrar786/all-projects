import OutLineButton from '@/components/common/Button/OutLineButton';
import CustomModal from '@/components/common/Modal/CustomModal';
import { useUserContext } from '@/context/user/UserContext';
import { ADDON_TYPES, IMultiValueTableHeading } from '@/interfaces/addons';
import { Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MultiValuesTable from './MultiValuesTable';

const { CALLS, DISCOUNT_CURVE, FIXING_CURVE, SINKS, NONE } = ADDON_TYPES;
interface Props {
  tableHeading?: IMultiValueTableHeading[];
  setSingleRow: (value: any) => void;
  selectedHeading?: string;
  disableMultiValue?: boolean;
}

const MultiValues = ({ tableHeading, setSingleRow, selectedHeading, disableMultiValue }: Props) => {
  const router = useRouter();
  const options = router.query.option as string;
  const { setTotalMultiValueCount, totalMultiValueCount } = useUserContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getRows = (key: string) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    };

    const updateTotalMultiValueCount = (key: string) => {
      const rows = getRows(key);
      delete rows[0]?.add;
      delete rows[0]?.id;
      delete rows[0]?.sub;

      const length = rows.length;
      const hasData = rows.some((row: any) => Object.values(row).some((value) => value));

      setTotalMultiValueCount(hasData ? length : 0);
    };

    switch (selectedHeading) {
      case CALLS:
        updateTotalMultiValueCount(CALLS);
        break;
      case SINKS:
        updateTotalMultiValueCount(SINKS);
        break;
      case FIXING_CURVE:
        updateTotalMultiValueCount(FIXING_CURVE);
        break;
      case DISCOUNT_CURVE:
        updateTotalMultiValueCount(DISCOUNT_CURVE);
        break;
      default:
        break;
    }
  }, [selectedHeading]);

  const handleAddValues = () => {
    setShowModal(true);
    const searchParams = new URLSearchParams(window.location.search);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <Grid item lg={4} md={12} sm={12} xs={12}>
      <Stack>
        {selectedHeading !== NONE && (
          <Box>
            <OutLineButton
              disabled={disableMultiValue}
              onClick={handleAddValues}
              text="Add Values"
              sx={{
                marginTop: '2.06rem',
                height: '2.5rem',
              }}
            />
          </Box>
        )}
      </Stack>

      <CustomModal
        maxWidth="md"
        fullWidth={true}
        sxStyle={{
          '& .MuiDialog-paper': {
            width: selectedHeading === 'Calls' ? 'auto' : 'auto',
          },
        }}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <MultiValuesTable
          selectedHeading={selectedHeading}
          tableHeading={tableHeading}
          setSingleRow={setSingleRow}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </CustomModal>
    </Grid>
  );
};

export default MultiValues;
