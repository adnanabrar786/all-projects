import { Button, Stack, SxProps, TextField } from '@mui/material';
import { Category, CategoryType } from '@prisma/client';
import AddImageModal from 'components/common/AddImageModal';
import { AppLoader } from 'components/common/AppLoader';
import { DropZoneContainer, ImagePickerContainer } from 'components/common/ImagePicker/styled';
import PhoneNumberInput, { handlePhoneInputHelperTextValidNumber } from 'components/common/PhoneNumberInput';
import { MultiSelectDropdown } from 'components/new-common/MultiSelectDropdown';
import { useFormik } from 'formik';
import Image from 'next/image';
import { memo, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { ImageAspectRatioTypes } from 'utils/enums';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { submitImageGuest } from 'utils/submitImage';
import { errorToast } from 'utils/toast';
import { ValidateGuestsForm } from 'validators/guests';
import CustomButton from '../home/NewDashboard/CustomButton';
import CustomText from '../home/NewDashboard/CustomText';
import GuestVendorCardDelete from './GuestVendorCardDelete';

interface Props {
  deleteBox?: boolean;
  guest_types: Category[];
  handleCancel?: () => void;
  setDeleteBox?: (val: boolean) => void;
  onDelete?: (id: number) => void;
  sxContainer?: SxProps;
  onSubmit: (data: {
    email: string;
    picture?: File | null;
    phone?: string | null;
    id: number | null;
    roles: Category[];
    last_name: string;
    first_name: string;
    pictureName?: string | null;
  }) => Promise<void>;
  guest: null | {
    id: number;
    email: string;
    last_name: string;
    first_name: string;
    roles: Category[];
    phone: string | null;
    picture: string;
  };
}

const GuestCardForm = ({
  guest,
  deleteBox,
  guest_types,
  setDeleteBox,
  handleCancel,
  onDelete,
  onSubmit,
  sxContainer,
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');

  const formik = useFormik({
    initialValues: {
      email: guest ? guest.email : '',
      phone: guest ? guest.phone : '',
      roles: guest ? [...guest.roles] : [],
      last_name: guest ? guest.last_name : '',
      first_name: guest ? guest.first_name : '',
    },
    validationSchema: ValidateGuestsForm(),
    onSubmit: async (values) => {
      if (values.phone && !isValidPhoneNumber(values.phone)) {
        return;
      }

      setIsLoading(true);
      try {
        setTimeout(async () => {
          await onSubmit({
            ...values,
            id: guest ? guest.id : null,
            picture: selectedImage,
            pictureName: selectedImage ? name : guest?.picture,
          });
        }, 500);
      } finally {
        setTimeout(() => {
          setIsLoading(true);
        }, 2000);
      }
    },
  });

  const setRoles = (props: { id: string; value: string }) => {
    const exist = formik.values.roles.find(({ id }) => id === Number(props.id));
    if (!exist) {
      if (formik.values.roles.length === 2) {
        formik.values.roles.shift();
      }

      formik.setFieldValue('roles', [
        ...formik.values.roles,
        { id: Number(props.id), label: props.value, type: CategoryType.GUESTS },
      ]);
      return;
    }
    formik.setFieldValue('roles', [...formik.values.roles.filter((i) => i.id !== Number(props.id))]);
  };

  const openAddImageModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitUpload = async (file: File) => {
    try {
      if (file) {
        setIsImageLoading(true);
        await submitImageGuest(file, formik.values.first_name, name, 'profile');
        setSelectedImage(file);
        setIsImageLoading(false);
      }
    } catch (ex) {
      errorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      setIsImageLoading(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        sx={{
          px: 1,
          paddingTop: '12px',
          ...sxContainer,
        }}
      >
        <Stack sx={{ gap: '4px' }}>
          <Stack
            direction={'row'}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <CustomText
              text={guest ? 'Change Photo' : 'Add photo'}
              sx={{
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: '600',
              }}
            />
            <Stack>
              {guest && (
                <Stack
                  direction={'row'}
                  sx={{
                    alignSelf: { xs: 'center', lg: 'flex-start' },
                    display: { xs: 'none', lg: 'block' },
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: 'transparent',
                      borderRadius: '1rem',
                      border: 'none',
                      boxShadow: 'none',
                      color: '#FF5449',
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      textTransform: 'capitalize',
                      height: '17px',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                      },
                    }}
                    startIcon={<Image src="/images/dashboard/deleteRed.svg" alt="bin" width={14} height={16} />}
                    onClick={() => {
                      if (setDeleteBox) {
                        setDeleteBox(true);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            sx={{
              justifyContent: 'space-between',
              margin: '0 auto',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Stack
              sx={{
                width: { xs: '100%', lg: '49%' },
              }}
            >
              {selectedImage || (guest && guest.picture) ? (
                <Stack
                  sx={{
                    width: '100%',
                  }}
                >
                  <Stack
                    sx={{
                      position: 'relative',
                      left: 0,
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '2.8125rem',
                      img: {
                        width: '100%',
                        height: '100%',
                        borderRadius: '2.8125rem',
                        overflowX: 'hidden',
                        objectFit: 'cover',
                      },
                    }}
                  >
                    <ImagePickerContainer>
                      <DropZoneContainer>
                        <Image
                          alt="selected"
                          src={selectedImage ? URL.createObjectURL(selectedImage) : guest!.picture}
                          fill
                          quality={100}
                          onClick={() => openAddImageModal()}
                        />
                      </DropZoneContainer>
                    </ImagePickerContainer>

                    <Stack
                      sx={{
                        position: 'absolute',
                        right: -3,
                        bottom: 0,
                        cursor: 'pointer',
                        img: {
                          width: '24px',
                          height: '24px',
                          borderRadius: '1rem',
                          overflowX: 'hidden',
                          objectFit: 'cover',
                        },
                      }}
                      onClick={() => openAddImageModal()}
                    >
                      <Image src="images/wedding-vendor-images/camera.svg" alt="" width={3} height={3} />
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <Stack
                  sx={{
                    width: '100%',
                  }}
                >
                  <Button
                    onClick={() => openAddImageModal()}
                    component="label"
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '2.8125rem',
                      border: '2px dashed #F3F3F3',
                      boxSizing: 'border-box',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: 'white',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    <Image alt="add" src="/images/dashboard/add.svg" width={20} height={20} />

                    <Stack
                      sx={{
                        position: 'absolute',
                        right: -3,
                        bottom: 0,
                        cursor: 'pointer',
                        img: {
                          width: '24px',
                          height: '24px',
                          borderRadius: '1rem',
                          overflowX: 'hidden',
                          objectFit: 'cover',
                        },
                      }}
                    >
                      <Image src="images/wedding-vendor-images/camera.svg" alt="" width={3} height={3} />
                    </Stack>
                  </Button>
                </Stack>
              )}
            </Stack>
            <Stack
              sx={{
                width: { xs: '300px', lg: '49%' },
                marginTop: { xs: '20px', lg: '0px' },
                marginRight: { lg: '6px', xs: '0px' },
              }}
            >
              <CustomText
                text="Role"
                sx={{
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontWeight: '600',
                  marginBottom: '0.2rem',
                }}
              />
              <MultiSelectDropdown
                name="roles"
                label="Guests Type(s)"
                value={formik.values.roles.map((i) => i.label)}
                list={guest_types.map((i) => ({ ...i, id: String(i.id) }))}
                handleChange={(event, { props }) => setRoles(props)}
                sx={{
                  '&.MuiInputBase-root': {
                    height: '42px',
                    border: 'none',
                    backgroundColor: '#ffffff',
                  },
                  '&.Mui-focused': {
                    border: 'none',
                  },
                  '&.MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '&::placeholder': {
                    color: '#D14343',
                    fontStyle: 'normal',
                  },
                  '& em': {
                    fontStyle: 'normal',
                    color: '#BCBCBC',
                  },
                }}
              />
              <Stack
                sx={{
                  width: { xs: '100%' },
                }}
              >
                {formik.touched.roles && formik.errors.roles && formik.errors.roles.length && (
                  <CustomText
                    text={`${formik.errors.roles}`}
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#FF0000',
                      fontSize: '13px',
                      marginLeft: '15px',
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            sx={{
              gap: '4px',
              padding: '12px 0px 0px 0px',
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                width: '100%',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Stack
                sx={{
                  width: { xs: '100%', lg: '49%', gap: '0.25rem' },
                  marginTop: '1rem',
                }}
              >
                <CustomText
                  text="First Name"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                  }}
                />
                <TextField
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiInputBase-root': {
                      fieldset: {
                        borderWidth: 'none',
                        border: 'none !important',
                      },
                      input: {
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '18px',
                        borderRadius: '60px',
                        padding: '13px',
                      },
                    },
                    padding: '0px',
                    margin: '0px',
                    border: '1px solid #EAEAEA !important',
                    borderRadius: '60px',
                    backgroundColor: '#ffffff',
                    'input::placeholder': {
                      fontSize: '12px',
                      color: '#333333',
                      fontWeight: '400',
                    },
                  }}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <CustomText
                    text={formik.errors.first_name}
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#FF0000',
                      fontSize: '13px',
                      marginLeft: '15px',
                    }}
                  />
                )}
              </Stack>
              <Stack
                sx={{
                  width: { xs: '100%', lg: '49%', gap: '0.25rem' },
                  marginTop: '1rem',
                }}
              >
                <CustomText
                  text="Last Name"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                  }}
                />
                <TextField
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiInputBase-root': {
                      fieldset: {
                        borderWidth: 'none',
                        border: 'none !important',
                      },
                      input: {
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '18px',
                        borderRadius: '60px',
                        padding: '13px',
                      },
                    },
                    padding: '0px',
                    margin: '0px',
                    border: '1px solid #EAEAEA !important',
                    borderRadius: '60px',
                    backgroundColor: '#ffffff',
                    'input::placeholder': {
                      fontSize: '12px',
                      color: '#333333',
                      fontWeight: '400',
                    },
                  }}
                />
                {formik.errors.last_name && (
                  <CustomText
                    text={formik.errors.last_name}
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#FF0000',
                      fontSize: '13px',
                      marginLeft: '15px',
                    }}
                  />
                )}
              </Stack>

              <Stack
                sx={{
                  width: { xs: '100%', lg: '49%', gap: '0.25rem' },
                  marginTop: { lg: '1.05rem', xs: '0.8rem' },
                }}
              >
                <CustomText
                  text="Phone"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                  }}
                />

                <PhoneNumberInput
                  autoComplete="off"
                  errorText={true}
                  borderColor2={'#ffffff'}
                  backgroundColor={'#ffffff'}
                  placeholder="Phone"
                  name="number"
                  value={formik.values.phone ?? ''}
                  handleBlur={formik.handleBlur}
                  helperText={handlePhoneInputHelperTextValidNumber(formik.touched.phone, formik.values.phone)}
                  handleChange={(value) => {
                    formik.setFieldValue('phone', value);
                  }}
                  id="number"
                />
                {formik.errors.phone && (
                  <CustomText
                    text={formik.errors.phone}
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#FF0000',
                      fontSize: '13px',
                      marginLeft: '15px',
                    }}
                  />
                )}
              </Stack>

              <Stack
                sx={{
                  width: { xs: '100%', lg: '49%', gap: '0.25rem' },
                  marginTop: '1rem',
                }}
              >
                <CustomText
                  text="Email"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: '600',
                  }}
                />
                <TextField
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiInputBase-root': {
                      fieldset: {
                        borderWidth: 'none',
                        border: 'none !important',
                      },
                      input: {
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '18px',
                        borderRadius: '60px',
                        padding: '13px',
                      },
                    },
                    padding: '0px',
                    margin: '0px',
                    border: '1px solid #EAEAEA !important',
                    borderRadius: '60px',
                    backgroundColor: '#ffffff',
                    'input::placeholder': {
                      fontSize: '12px',
                      color: '#333333',
                      fontWeight: '400',
                    },
                  }}
                />
                {formik.errors.email && (
                  <CustomText
                    text={formik.errors.email}
                    sx={{
                      fontFamily: 'Poppins',
                      color: '#FF0000',
                      fontSize: '13px',
                      marginLeft: '15px',
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            sx={{
              gap: '0.5rem',
              marginTop: '1.5rem',
            }}
          >
            <Stack
              direction={{ xs: 'column-reverse', lg: 'row' }}
              gap={'0.75rem'}
              sx={{
                width: '100%',
              }}
            >
              <CustomButton
                type="button"
                disabled={isLoading}
                onClick={handleCancel}
                sx={{
                  textTransform: 'initial',
                  width: { xs: '100%', lg: '50%' },
                  backgroundColor: '#ffffff !important',
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: '500',
                  fontFamily: 'Poppins',
                  border: isLoading ? '1px solid grey' : '1px solid #00CAA5',
                }}
              >
                Cancel
              </CustomButton>

              <CustomButton
                disabled={formik.isSubmitting || isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#5AD3BD !important',
                  width: { xs: '100%', lg: '50%' },
                  border: '1px solid #5AD3BD !important ',
                  '&:active': {
                    backgroundColor: '#00CAA5 !important',
                  },
                  borderRadius: '16px',
                  height: '44px',
                  color: '#ffff',
                  fontWeight: '500',
                  textTransform: 'initial',
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontFamily: 'Poppins',
                }}
              >
                {isLoading ? (
                  <>
                    <AppLoader
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                      }}
                      size={20}
                      color={'#fff'}
                    />
                  </>
                ) : guest ? (
                  'Save changes'
                ) : (
                  'Add Member'
                )}
              </CustomButton>
            </Stack>

            {guest && !deleteBox && (
              <Stack
                direction={'row'}
                sx={{
                  alignSelf: { xs: 'center', lg: 'flex-start' },
                  paddingRight: '0.9rem',
                  display: { xs: 'block', lg: 'none' },
                }}
              >
                <Button
                  sx={{
                    backgroundColor: 'transparent',
                    borderRadius: '1rem',
                    border: 'none',
                    boxShadow: 'none',
                    color: '#FF5449',
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                    height: '17px',
                    marginTop: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                  startIcon={
                    <>
                      <Image src="/images/dashboard/deleteRed.svg" alt="bin" width={14} height={16} />
                    </>
                  }
                  onClick={() => {
                    if (setDeleteBox) {
                      setDeleteBox(true);
                    }
                  }}
                >
                  Delete
                </Button>
              </Stack>
            )}
          </Stack>

          {deleteBox && (
            <GuestVendorCardDelete
              text="Are you sure you want to delete this Guest?"
              cancelBtn="Cancel"
              deleteBtn="Delete Guests"
              deleteGuestLoading={isDeleteLoading}
              handleDelete={() => {
                setIsDeleteLoading(true);
                try {
                  setTimeout(async () => {
                    if (guest && onDelete) {
                      onDelete(guest.id);
                    }
                  }, 1000);
                } finally {
                  setTimeout(() => {
                    setIsDeleteLoading(false);
                  }, 2000);
                }
              }}
              setDeleteBox={setDeleteBox}
            />
          )}
        </Stack>
        <AddImageModal
          open={isOpen}
          loading={isImageLoading}
          setName={setName}
          handleClose={handleClose}
          onSubmitUpload={onSubmitUpload}
          aspectRatioType={ImageAspectRatioTypes.PROFILE}
          userProfile={true}
          defaultImage={selectedImage ? URL.createObjectURL(selectedImage) : '/images/alt-image.png'}
        />
      </Stack>
    </form>
  );
};

export default memo(GuestCardForm);
