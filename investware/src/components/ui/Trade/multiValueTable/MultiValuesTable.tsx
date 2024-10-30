import CustomButton from '@/components/common/Button/CustomButton';
import OutLineButton from '@/components/common/Button/OutLineButton';
import AppDatePicker from '@/components/common/CustomDatePicker/AppDatePicker';
import CustomModal from '@/components/common/Modal/CustomModal';
import TextSm from '@/components/common/Text/TextSm';
import TextXs from '@/components/common/Text/TextXs';
import { crossIcon, minusButton, PlusButton } from '@/constants/images.routes';
import { BUTTON_TEXT } from '@/constants/locales';
import { toastError, toastSuccess } from '@/constants/toaster';
import { useUserContext } from '@/context/user/UserContext';
import { ADDON_TYPES, ITempRows } from '@/interfaces/addons';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  tableHeading?: any;
  setSingleRow: (value: any) => void;
  showModal?: boolean;
  setShowModal?: (value: boolean) => void;
  selectedHeading?: string;
}

const { CALLS, DISCOUNT_CURVE, FIXING_CURVE, SINKS } = ADDON_TYPES;

export default function MultiValuesTable({
  tableHeading,
  setSingleRow,
  showModal,
  setShowModal,
  selectedHeading,
}: Props) {
  const { setTotalMultiValueCount } = useUserContext();
  const [temRowIdx, setTemRowIdx] = useState(null);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectRowId, setSelectRowId] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [toTalAddOnRows, setToTalAddOnRows] = useState(0);

  const getLocalStorageRows = () => {
    switch (selectedHeading) {
      case CALLS:
        return localStorage.getItem(CALLS)
          ? JSON.parse(localStorage.getItem(CALLS)!)
          : [{ id: 0, CallsPrices: '', CallsDate: '', add: '+', sub: '-' }];

      case SINKS:
        return localStorage.getItem(SINKS)
          ? JSON.parse(localStorage.getItem(SINKS)!)
          : [
              {
                id: 0,
                SinksDate: '',
                SinksAmount: '',
                SinksPrice: '',
                add: '+',
                sub: '-',
              },
            ];

      case FIXING_CURVE:
        return localStorage.getItem(FIXING_CURVE)
          ? JSON.parse(localStorage.getItem(FIXING_CURVE)!)
          : [
              {
                id: 0,
                Maturity: '',
                Rate: '',
                add: '+',
                sub: '-',
              },
            ];

      case DISCOUNT_CURVE:
        return localStorage.getItem(DISCOUNT_CURVE)
          ? JSON.parse(localStorage.getItem(DISCOUNT_CURVE)!)
          : [
              {
                id: 0,
                Maturity: '',
                Rate: '',
                add: '+',
                sub: '-',
              },
            ];

      default:
        return [];
    }
  };

  //@ts-ignore
  const setLocalRowItems = (tempRows) => {
    setSingleRow(tempRows[0]);

    switch (selectedHeading) {
      case CALLS:
        localStorage.setItem(CALLS, JSON.stringify(tempRows));
        setRows(tempRows);
        const getCallRows = () => {
          const calls = localStorage.getItem(CALLS);
          return calls ? JSON.parse(calls) : [];
        };

        const updateTotalMultiValueCount = () => {
          const callRows = getCallRows();
          const callRowsLength = callRows.length;
          //@ts-ignore

          const rowCount = callRows.find((val) => val.CallsPrices || val.CallsDate);

          if (!rowCount && callRowsLength === 1) {
            setTotalMultiValueCount(0);
            setToTalAddOnRows(callRowsLength);
          } else if (callRows.length) {
            setTotalMultiValueCount(callRows.length);
            setToTalAddOnRows(callRowsLength);
          }
        };

        updateTotalMultiValueCount();
        break;

      case SINKS:
        localStorage.setItem(SINKS, JSON.stringify(tempRows));
        setRows(tempRows);

        const getSinkRows = () => {
          const sinks = localStorage.getItem(SINKS);
          return sinks ? JSON.parse(sinks) : [];
        };

        const updateTotalMultiSinkValueCount = () => {
          const sinksRows = getSinkRows();
          const sinksRowsLength = sinksRows.length;

          //@ts-ignore
          const rowCount = sinksRows.find((val) => val.SinksDate || val.SinksAmount || val.SinksPrice);

          if (!rowCount && sinksRowsLength === 1) {
            setTotalMultiValueCount(0);
            setToTalAddOnRows(sinksRowsLength);
          } else if (sinksRows.length) {
            setTotalMultiValueCount(sinksRows.length);
            setToTalAddOnRows(sinksRowsLength);
          }
        };

        updateTotalMultiSinkValueCount();

        break;

      case FIXING_CURVE:
        localStorage.setItem(FIXING_CURVE, JSON.stringify(tempRows));
        setRows(tempRows);

        const getFixingCurveRows = () => {
          const fixingCurve = localStorage.getItem(FIXING_CURVE);
          return fixingCurve ? JSON.parse(fixingCurve) : [];
        };

        const updateTotalMultiFixingCurveValueCount = () => {
          const fixingCurveRows = getFixingCurveRows();
          const fixingCurveRowsLength = fixingCurveRows.length;
          //@ts-ignore

          const rowCount = fixingCurveRows.find((val) => val.Maturity | val.Rate);

          if (!rowCount && fixingCurveRowsLength === 1) {
            setTotalMultiValueCount(0);
            setToTalAddOnRows(fixingCurveRowsLength);
          } else if (fixingCurveRows.length) {
            setTotalMultiValueCount(fixingCurveRows.length);
            setToTalAddOnRows(fixingCurveRowsLength);
          }
        };

        updateTotalMultiFixingCurveValueCount();
        break;

      case DISCOUNT_CURVE:
        localStorage.setItem(DISCOUNT_CURVE, JSON.stringify(tempRows));
        setRows(tempRows);

        const getDiscountCurveRows = () => {
          const discountCurve = localStorage.getItem(DISCOUNT_CURVE);
          return discountCurve ? JSON.parse(discountCurve) : [];
        };

        const updateTotalMultiDiscountCurveValueCount = () => {
          const discountCurveRows = getDiscountCurveRows();
          const discountCurveRowsLength = discountCurveRows.length;
          //@ts-ignore

          const rowCount = discountCurveRows.find((val) => val.Maturity | val.Rate);

          if (!rowCount && discountCurveRowsLength === 1) {
            setTotalMultiValueCount(0);
            setToTalAddOnRows(discountCurveRowsLength);
          } else if (discountCurveRows.length) {
            setTotalMultiValueCount(discountCurveRows.length);
            setToTalAddOnRows(discountCurveRowsLength);
          }
        };

        updateTotalMultiDiscountCurveValueCount();
        break;

      default:
        break;
    }
  };

  let localStorageRows = getLocalStorageRows();
  //@ts-ignore

  const recalculateId = (tempRows) => {
    //@ts-ignore

    return tempRows.map((row, index) => {
      return {
        ...row,
        id: index,
      };
    });
  };

  const removeEmptyRows = () => {
    switch (selectedHeading) {
      case CALLS:
        //@ts-ignore

        const callsFilteredData = localStorageRows.filter((data) => {
          return data.CallsPrices && data.CallsDate;
        });

        if (callsFilteredData.length) {
          setLocalRowItems(recalculateId(callsFilteredData));
        } else {
          setLocalRowItems([
            {
              id: 0,
              CallsPrices: '',
              CallsDate: '',
              add: '+',
              sub: '-',
            },
          ]);
        }
        break;

      case SINKS:
        //@ts-ignore

        const sinkFilteredData = localStorageRows.filter((data) => {
          return data.SinksDate && data.SinksAmount && data.SinksPrice;
        });

        if (sinkFilteredData.length) {
          setLocalRowItems(recalculateId(sinkFilteredData));
        } else
          setLocalRowItems([
            {
              id: 0,
              SinksDate: '',
              SinksAmount: '',
              SinksPrice: '',
              add: '+',
              sub: '-',
            },
          ]);
        break;

      case FIXING_CURVE:
        //@ts-ignore

        const fixingCurveFilteredData = localStorageRows.filter((data) => {
          return data.Maturity && data.Rate;
        });

        if (fixingCurveFilteredData.length) {
          setLocalRowItems(recalculateId(fixingCurveFilteredData));
        } else
          setLocalRowItems([
            {
              id: 0,
              Maturity: '',
              Rate: '',
              add: '+',
              sub: '-',
            },
          ]);
        break;

      case DISCOUNT_CURVE:
        //@ts-ignore

        const discountCurveFilteredData = localStorageRows.filter((data) => {
          return data.Maturity && data.Rate;
        });

        if (discountCurveFilteredData.length) {
          setLocalRowItems(recalculateId(discountCurveFilteredData));
        } else
          setLocalRowItems([
            {
              id: 0,
              Maturity: '',
              Rate: '',
              add: '+',
              sub: '-',
            },
          ]);
        break;

      default:
        break;
    }
  };

  useMemo(() => {
    removeEmptyRows();
  }, [selectedHeading]);

  useEffect(() => {
    if (!showModal) {
      removeEmptyRows();
    }
  }, [showModal]);

  const columns = [
    ...tableHeading,

    {
      field: 'add',
      headerName: '',
      width: 60,
      editable: false,
      align: 'center',
      GridHeader: 'none',
      //@ts-ignore

      renderCell: (params) => {
        return (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Image priority src={PlusButton} alt={'icon'} width={24} height={24} />
          </Stack>
        );
      },
    },

    {
      field: 'sub',
      headerName: '',
      width: 60,
      editable: false,
      align: 'center',
      GridHeader: 'none',
      //@ts-ignore

      renderCell: (params) => {
        return (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Image priority src={minusButton} alt={'icon'} width={24} height={24} />
          </Stack>
        );
      },
    },
  ];

  const addMainFields = () => {
    switch (selectedHeading) {
      case CALLS:
        return {
          CallsPrices: '',
          CallsDate: '',
        };
      case SINKS:
        return {
          SinksDate: '',
          SinksAmount: '',
          SinksPrice: '',
        };

      case FIXING_CURVE:
        return {
          Maturity: '',
          Rate: '',
        };

      case DISCOUNT_CURVE:
        return {
          Maturity: '',
          Rate: '',
        };

      default:
        break;
    }
  };

  //@ts-ignore
  const handleCellClick = (e) => {
    if (e.field === 'SinksDate') {
      setTemRowIdx(e.id);
      setShowDateModal(true);
    }

    if (e.field === 'CallsDate') {
      setTemRowIdx(e.id);
      setShowDateModal(true);
    }

    if (e.field === 'add') {
      setLocalRowItems([
        ...localStorageRows,
        {
          id: localStorageRows[localStorageRows.length - 1].id + 1,
          sub: '-',
          add: '+',
          ...addMainFields(),
        },
      ]);
    } else if (e.field === 'sub') {
      //@ts-ignore
      const filteredRows = localStorageRows.filter((row) => parseInt(row.id) !== parseInt(selectRowId));

      let isLastDataRow = null;

      switch (selectedHeading) {
        case CALLS:
          isLastDataRow = rows.find((val) => val.CallsPrices || val.CallsDate);
          break;
        case SINKS:
          isLastDataRow = rows.find((val) => val.SinksDate || val.SinksPrice || val.SinksAmount);
          break;

        case FIXING_CURVE:
          isLastDataRow = rows.find((val) => val.Maturity || val.Rate);
          break;

        case DISCOUNT_CURVE:
          isLastDataRow = rows.find((val) => val.Maturity || val.Rate);
          break;

        default:
          break;
      }

      if (localStorageRows.length > 1 || isLastDataRow) {
        setShowDeleteModal(true);
      }
      setTemRowIdx(e.id);
      setSelectRowId(e.row.id);
    }
  };

  //@ts-ignore

  const handleChangeValue = (rowIdx, valIdx, value) => {
    const tempRows: ITempRows[] = [...localStorageRows];
    //@ts-ignore

    tempRows[rowIdx][valIdx] = value;

    setLocalRowItems(tempRows);
  };

  const deleteRow = () => {
    if (localStorageRows.length === 1) {
      setLocalRowItems([
        {
          id: 0,
          sub: '-',
          add: '+',
          ...addMainFields(),
        },
      ]);
    } else {
      //@ts-ignore
      const filteredRows = localStorageRows
        //@ts-ignore
        .filter((row) => parseInt(row.id) !== parseInt(selectRowId))
        //@ts-ignore
        .map((row, idx) => {
          return { ...row, id: idx };
        });

      setLocalRowItems(filteredRows);
    }
    setShowDeleteModal(false);
  };

  useEffect(() => {
    removeEmptyRows();
  }, [selectedHeading]);

  const handleSaveValues = () => {
    //@ts-ignore
    switch (selectedHeading) {
      case CALLS:
        //@ts-ignore
        const callsFilteredData = localStorageRows.filter((data) => {
          return !data.CallsPrices && !data.CallsDate;
        });

        //@ts-ignore
        const callsFilteredDataEmptyField = localStorageRows.filter((data) => {
          return !data.CallsPrices || !data.CallsDate;
        });

        if (callsFilteredData.length) {
          toastError('Do Not Left Empty Row');
        } else if (callsFilteredDataEmptyField.length) {
          toastError('Some Field is Missing');
        } else {
          toastSuccess('Your Values have been saved');
          if (setShowModal) {
            setShowModal(false);
          }
        }

        break;

      case SINKS:
        //@ts-ignore

        const sinkFilteredData = localStorageRows.filter((data) => {
          return !data.SinksDate && !data.SinksAmount && !data.SinksPrice;
        });

        //@ts-ignore
        const sinkFilteredDataEmptyField = localStorageRows.filter((data) => {
          return !data.SinksDate || !data.SinksAmount || !data.SinksPrice;
        });

        if (sinkFilteredData.length) {
          toastError('Do Not Left Empty Row');
        } else if (sinkFilteredDataEmptyField.length) {
          toastError('Some Field is Missing');
        } else {
          toastSuccess('Your Values have been saved');
          if (setShowModal) {
            setShowModal(false);
          }
        }
        break;

      case FIXING_CURVE:
        //@ts-ignore
        const fixingCurveFilteredData = localStorageRows.filter((data) => {
          return !data.Maturity && !data.Rate;
        });

        //@ts-ignore
        const fixingCurveFilteredDataEmptyField = localStorageRows.filter((data) => {
          return !data.Maturity || !data.Rate;
        });

        if (fixingCurveFilteredData.length) {
          toastError('Do Not Left Empty Row');
        } else if (fixingCurveFilteredDataEmptyField.length) {
          toastError('Some Field is Missing');
        } else {
          toastSuccess('Your Values have been saved');
          if (setShowModal) {
            setShowModal(false);
          }
        }
        break;

      case DISCOUNT_CURVE:
        //@ts-ignore
        const discountCurveFilteredData = localStorageRows.filter((data) => {
          return !data.Maturity && !data.Rate;
        });

        //@ts-ignore
        const discountCurveFilteredDataEmptyField = localStorageRows.filter((data) => {
          return !data.Maturity || !data.Rate;
        });

        if (discountCurveFilteredData.length) {
          toastError('Do Not Left Empty Row');
        } else if (discountCurveFilteredDataEmptyField.length) {
          toastError('Some Field is Missing');
        } else {
          toastSuccess('Your Values have been saved');
          if (setShowModal) {
            setShowModal(false);
          }
        }
        break;

      default:
        break;
    }
  };

  const handleClearValues = () => {
    switch (selectedHeading) {
      case CALLS:
        localStorage.removeItem(CALLS);
        toastSuccess('Calls Values Removed');
        setLocalRowItems([
          {
            id: 0,
            CallsPrices: '',
            CallsDate: '',
            add: '+',
            sub: '-',
          },
        ]);

        break;

      case SINKS:
        localStorage.removeItem(SINKS);
        toastSuccess('Sinks Values Removed');
        setLocalRowItems([
          {
            id: 0,
            SinksDate: '',
            SinksAmount: '',
            SinksPrice: '',
            add: '+',
            sub: '-',
          },
        ]);

        break;

      case FIXING_CURVE:
        localStorage.removeItem(FIXING_CURVE);
        toastSuccess('Fixing Curve removed');
        setLocalRowItems([
          {
            id: 0,
            Maturity: '',
            Rate: '',
            add: '+',
            sub: '-',
          },
        ]);

        break;

      case DISCOUNT_CURVE:
        localStorage.removeItem(DISCOUNT_CURVE);
        toastSuccess('Discount Curve Values Removed');
        setLocalRowItems([
          {
            id: 0,
            Maturity: '',
            Rate: '',
            add: '+',
            sub: '-',
          },
        ]);

        break;

      default:
        break;
    }
  };

  return (
    <Stack
      sx={{
        padding: { sm: '1rem 2rem 2rem 2rem', xs: '1rem 0.5rem 2rem 0.5rem' },
      }}
    >
      <Stack
        sx={{
          marginBottom: '1rem',
          width: '100%',
          alignItems: 'flex-end',
          img: { cursor: 'pointer' },
        }}
      >
        <Image
          src={crossIcon}
          width={16}
          height={16}
          alt="icon"
          onClick={() => {
            if (setShowModal) {
              setShowModal(!showModal);
            }
          }}
        />
      </Stack>
      <Box sx={{ height: 400, width: '100%', paddingBottom: { sm: '40px', xs: '60px' } }}>
        <DataGrid
          showColumnVerticalBorder={true}
          showCellVerticalBorder={true}
          sx={{
            width: '100%',
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '.MuiDataGrid-cell': {
              alignItems: 'center',
              justifyContent: 'center',
            },
            '.MuiDataGrid-row': {
              borderBottom: '1px solid #e0e0e0',
              '--rowBorderColor': 'none',
            },
            '.MuiDataGrid-cellCheckbox': {
              display: 'none',
              gridTemplateColumns: 'auto',
            },
            '.MuiDataGrid-columnHeaderCheckbox': {
              display: 'none',
              gridTemplateColumns: 'auto',
            },
            // for pagination arrow
            '.MuiButtonBase-root': {
              display: 'none',
            },
            '.MuiDataGrid-scrollbar': {
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#BDBDBD',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#EEE',
              },
              // remove three dots selectedHeading
              '.MuiSvgIcon-root': {
                display: 'none',
              },
            },

            // remove footer
            '.MuiDataGrid-footerContainer': {
              display: 'none',
            },

            '.css-1jlz3st': {
              display: 'none',
            },
          }}
          onCellKeyDown={(e, x: any) => {
            setTimeout(() => {
              handleChangeValue(e.id, e.field, x.target.value);
            }, 0);
          }}
          processRowUpdate={(newRow, oldRow) => {
            const tempRows = [...rows];
            //@ts-ignore
            tempRows[newRow.id] = newRow;
            setLocalRowItems(tempRows);
            setRows(tempRows);
            return newRow;
          }}
          onCellClick={(e) => {
            handleCellClick(e);
          }}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pagination={true}
        />
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          sx={{
            marginTop: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              gap: '0.5rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomButton
              text="Saved Values"
              onClick={handleSaveValues}
              sxText={{
                fontSize: { sm: '0.8125rem', xs: '0.75rem' },
              }}
              sx={{
                padding: { sm: '0.5rem 1rem', xs: ' 0.5rem' },
              }}
            />
            <OutLineButton
              text={BUTTON_TEXT.CLEAR_CONTENT}
              onClick={handleClearValues}
              sx={{
                border: '1px solid var(--border-grey-200)',
                color: 'var(--text-grey-100)',
                padding: { sm: '0.5rem 1rem', xs: ' 0.5rem' },
                fontSize: '0.9375rem',
                fontWeight: 500,
                lineHeight: '1.625rem',
                letterSpacing: '0.02875rem',
                ':hover': {
                  color: 'var(--text-grey-100)',
                },
              }}
              sxText={{
                fontSize: { sm: '0.8125rem', xs: '0.75rem' },
              }}
            />
          </Stack>
          <Stack
            direction={'row'}
            sx={{
              gap: { sm: '1rem', xs: '0.5rem' },
              alignItems: 'center',
              marginTop: { sm: '0rem', xs: '0.5rem' },
            }}
          >
            <TextSm
              text="Total Rows :"
              sx={{
                color: 'var(--black)',
                fontWeight: '500',
              }}
            />
            <TextSm
              sx={{
                fontWeight: '500',
              }}
              text={`${toTalAddOnRows}`}
            />
          </Stack>
        </Stack>

        {showDateModal ? (
          <CustomModal
            showModal={showDateModal}
            setShowModal={setShowDateModal}
            sx={{
              borderRadius: '0.5rem',
            }}
          >
            <AppDatePicker
              onChange={(e: any) => {
                selectedHeading === SINKS
                  ? handleChangeValue(temRowIdx, 'SinksDate', dayjs(e).format('MM-DD-YYYY'))
                  : handleChangeValue(temRowIdx, 'CallsDate', dayjs(e).format('MM-DD-YYYY'));
                setShowDateModal(false);
              }}
              value={dayjs(Date.now())}
            />
          </CustomModal>
        ) : null}

        {showDeleteModal ? (
          <CustomModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            sx={{
              borderRadius: '0.5rem',
            }}
          >
            <Stack
              sx={{
                height: '100px',
                width: '200px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <TextXs
                sx={{
                  color: 'var(--red)',
                  fontSize: '0.75rem',
                }}
                text="Are You Sure to Delete Row"
              />
              <OutLineButton
                onClick={deleteRow}
                sx={{
                  height: '1.7rem',
                  fontSize: '0.75rem',
                  width: '100px',
                }}
                text="Delete"
              />
            </Stack>
          </CustomModal>
        ) : null}
      </Box>
    </Stack>
  );
}
