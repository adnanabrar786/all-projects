import { CircularProgress, Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLoader } from 'components/common/AppLoader';
import { useFormik } from 'formik';
import { IFianceInfoForm } from 'interfaces/forms';
import { IUpdateSecondaryUserBody, IUpdateUserProfilePicBody } from 'interfaces/user';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { TiCamera } from 'react-icons/ti';
import { isValidPhoneNumber } from 'react-phone-number-input';
import AccountService from 'services/account.service';
import { CreateImagePath, UploadAsset, createFileObjectURL } from 'services/storage.service';
import { useCoupleInfo } from 'state/useCouple';
import { ImageAspectRatioTypes } from 'utils/enums';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { AppText, ButtonText } from 'utils/enums/text';
import { getFileExtension } from 'utils/strings';
import { errorToast, successToast } from 'utils/toast';
import { FianceInfoValidation } from 'validators';
import { useStoreCouple } from '../../../state/useCouple';
import AddImageModal from '../AddImageModal';
import { DropZoneContainer, ImagePickerContainer } from '../ImagePicker/styled';
import Input from '../InputField';
import PhoneNumberInput, { handlePhoneInputHelperTextValidNumber, handleValidNumberError } from '../PhoneNumberInput';

const FianceInformation = () => {
  const accountService = new AccountService();
  const coupleInfo = useCoupleInfo();
  const fiancePicture = coupleInfo && coupleInfo.coupleInfo && coupleInfo.coupleInfo[0].user.picture;
  const { fetchCoupleInfo } = useStoreCouple();
  const [fianceId, setFianceId] = useState<string>('');
  const [editInformation, setEditInformation] = useState(false);

  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fiance_first_name: '',
      fiance_last_name: '',
      fiance_email: '',
      fiance_number: '',
      picture: '/images/alt-image.png',
    },
    validationSchema: FianceInfoValidation(),
    onSubmit: async (values: IFianceInfoForm) => {
      if (values.fiance_number) {
        const check = isValidPhoneNumber(values.fiance_number);
        if (!check) {
          formik.setFieldError('fiance_number', 'invalid phone number');
          return;
        }
      }
      const body: IUpdateSecondaryUserBody = {
        data: {
          id: fianceId,
          email: values.fiance_email ? values.fiance_email : '',
          phone: values.fiance_number ? values.fiance_number : '',
          last_name: values.fiance_last_name ? values.fiance_last_name : '',
          first_name: values.fiance_first_name ? values.fiance_first_name : '',
        },
      };
      updateSecondaryUser.mutate(body);
    },
  });

  useEffect(() => {
    if (!coupleInfo.isInit && !coupleInfo.coupleInfo) {
      errorToast(ERROR_MESSAGES.GETTING_COUPLE);
      return;
    }
    if (coupleInfo.coupleInfo) {
      const _data = coupleInfo.coupleInfo;
      let fiance;

      _data.forEach((element) => {
        if (element.createdBy !== element.user_id) {
          fiance = element.user;
        }
      });
      setFianceId(fiance.id);
      setPicture(fiance.picture);
      formik.setValues({
        fiance_first_name: fiance.first_name,
        fiance_last_name: fiance.last_name,
        fiance_email: fiance.email,
        fiance_number: fiance.phone,
        picture: fiance.picture ? fiance.picture : '/images/alt-image.png',
      });
    }
  }, [coupleInfo.isLoading, coupleInfo.isInit]);

  const updateUserProfilePic = useMutation(accountService.UpdateProfilePic, {
    onSuccess: ({ data: { data } }: any) => {
      formik.setValues({
        ...formik.values,
        picture: data.user.picture,
      });
      fetchCoupleInfo();
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.COUPLE] });
    },
  });

  const onSubmitUpload = async (file: File) => {
    try {
      if (file) {
        const imgFile = {
          url: createFileObjectURL(file),
        };

        const image_name = Date.now() + '-profile.' + getFileExtension(name);
        const path = CreateImagePath(fianceId, 'profile', image_name);
        setLoading(true);
        const result = await UploadAsset(path, 'public', imgFile.url);
        setLoading(false);
        const body: IUpdateUserProfilePicBody = {
          data: {
            id: fianceId,
            profile_pic: 'public/' + result.key,
          },
        };
        updateUserProfilePic.mutate(body);
        handleSubmissionMessage();
        handleClose();
      }
    } catch (ex) {
      errorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  const updateSecondaryUser = useMutation(
    async (body: IUpdateSecondaryUserBody) => {
      await accountService.UpdateSecondaryUser(body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.COUPLE] });
        fetchCoupleInfo();
        successToast(SUCCESS_MESSAGES.FIANCE_PROFILE_UPDATED);
        setEditInformation(!editInformation);
      },
    },
  );

  if (coupleInfo.isLoading) {
    return (
      <AppLoader
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#00D5D4',
        }}
        size={40}
      />
    );
  }

  const handleSubmissionMessage = () => {
    successToast(SUCCESS_MESSAGES.IMAGE_UPLOADED);
  };

  const openAddImageModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelClick = () => {
    setEditInformation(!editInformation);
    if (coupleInfo.coupleInfo) {
      const _data = coupleInfo.coupleInfo;
      let fiance;
      _data.forEach((element) => {
        if (element.createdBy !== element.user_id) {
          fiance = element.user;
        }
      });

      setFianceId(fiance.id);
      setPicture(fiance.picture);
      formik.setFieldTouched('fiance_number', false);
      formik.setValues({
        fiance_first_name: fiance.first_name ?? '',
        fiance_last_name: fiance.last_name ?? '',
        fiance_email: fiance.email ?? '',
        fiance_number: fiance.phone ?? '',
        picture: fiance.picture ? fiance.picture : '/images/alt-image.png',
      });
    }
  };

  const ImagePicker = () => {
    return (
      <ImagePickerContainer>
        <DropZoneContainer>
          <Image
            priority={true}
            width={158}
            height={160}
            className="rounded-full cursor-pointer image-circle"
            src={formik.values.picture}
            alt="User"
            onClick={() => {
              setEditInformation(true);
              openAddImageModal();
            }}
            style={{
              objectFit: fiancePicture ? 'cover' : 'unset',
            }}
          />
        </DropZoneContainer>
      </ImagePickerContainer>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            '.image-circle': {
              height: { sm: '158px', xs: '119px' },
              width: { sm: '160px', xs: '120px' },
            },
          }}
        >
          <div className="relative px-8 mb-10">
            {!editInformation ? (
              <div className="flex items-center gap-6 text-2xl font-medium text-purple">
                <ImagePicker />
                <span className="bg-white absolute border-2 border-deep_purple left-[7rem] sm:left-[8.7rem] bottom-0 text-deep_purple w-7 h-7 sm:w-9 sm:h-9 text-3xl rounded-full flex justify-center items-center m-4">
                  <TiCamera
                    className="p-1"
                    onClick={() => {
                      setEditInformation(true);
                      openAddImageModal();
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-10 text-2xl font-medium text-purple">
                <ImagePicker />
                <span className="bg-white absolute border-2 border-deep_purple left-[7rem] sm:left-[8.7rem] bottom-0 text-deep_purple w-7 h-7 sm:w-9 sm:h-9 text-3xl rounded-full flex justify-center items-center m-4">
                  <TiCamera
                    className="p-1"
                    onClick={() => {
                      setEditInformation(true);
                      openAddImageModal();
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </span>
                <div>
                  <p className="text-lg sm:text-2xl">{AppText.ADD_PICTURE}</p>
                  <p className="font-medium text-sm">{AppText.OPTIONAL_ROUND_BRACKET}</p>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.FIANCE_FIRST_NAME} *</span>
          <Input
            id="fiance_first_name"
            name="fiance_first_name"
            className="mt-2"
            value={formik.values.fiance_first_name}
            helperText={formik.touched.fiance_first_name && formik.errors.fiance_first_name}
            error={Boolean(formik.touched.fiance_first_name && formik.errors.fiance_first_name)}
            onChange={formik.handleChange}
            placeholder="Fiance's First Name"
            disabled={!editInformation}
          />
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.FIANCE_LAST_NAME}</span>
          <Input
            id="fiance_last_name"
            name="fiance_last_name"
            className="mt-2"
            value={formik.values.fiance_last_name}
            helperText={formik.touched.fiance_last_name && formik.errors.fiance_last_name}
            error={Boolean(formik.touched.fiance_last_name && formik.errors.fiance_last_name)}
            onChange={formik.handleChange}
            placeholder="Fiance's Last Name"
            disabled={!editInformation}
          />
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.EMAIL}</span>
          <Input
            id="fiance_email"
            name="fiance_email"
            className="mt-2"
            value={formik.values.fiance_email}
            helperText={formik.touched.fiance_email && formik.errors.fiance_email}
            error={Boolean(formik.touched.fiance_email && formik.errors.fiance_email)}
            onChange={formik.handleChange}
            placeholder="Email Address"
            disabled={!editInformation}
          />
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'} mt={'0.45rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.MOBILE_NUMBER}</span>
          <PhoneNumberInput
            placeholder="Phone"
            name="fiance_number"
            value={formik.values.fiance_number}
            handleBlur={formik.handleBlur}
            error={handleValidNumberError(formik.touched.fiance_number, formik.values.fiance_number)}
            helperText={handlePhoneInputHelperTextValidNumber(
              formik.touched.fiance_number,
              formik.values.fiance_number,
            )}
            handleChange={(value) => {
              formik.setFieldValue('fiance_number', value);
              formik.setFieldTouched('fiance_number', false);
            }}
            id="fiance_number"
            disabled={!editInformation}
          />
        </Grid>
        <Grid item xs={12} my={'1rem'}>
          {!editInformation ? (
            <Grid item xs={12} mt={'1rem'}>
              <div
                id="edit-info-btn-div"
                className="flex items-center justify-center md:justify-start mx-6 mb-[7px] edit-info-btn-div"
              >
                {!editInformation ? (
                  <button
                    id="edit-info-btn"
                    onClick={() => {
                      setEditInformation(!editInformation);
                    }}
                    className="text-w_sm xl:text-w_0xl cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-2 edit-info-btn"
                  >
                    <FiEdit className="text-w_base1 xl:text-w_2xl mr-2" />
                    {ButtonText.EDIT_INFORMATION}
                  </button>
                ) : null}
              </div>
            </Grid>
          ) : (
            <div className="flex items-center justify-center md:justify-start gap-6 mx-10 my-[10px] save-btn-div">
              {updateSecondaryUser.isLoading ? (
                <CircularProgress sx={{ color: '#00D5D4' }} />
              ) : (
                <>
                  <button
                    id="save-btn"
                    type="submit"
                    className="cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-2 save-btn"
                  >
                    {ButtonText.SAVE}
                  </button>
                  <button
                    id="cance-btn"
                    onClick={handleCancelClick}
                    className="cance-btn cursor-pointer flex justify-center items-center bg-white border border-secondary text-secondary rounded-full px-8 py-2"
                  >
                    {ButtonText.CANCEL}
                  </button>
                </>
              )}
            </div>
          )}
        </Grid>
        <AddImageModal
          open={isOpen}
          loading={loading}
          setName={setName}
          userProfile={true}
          defaultImage={picture}
          handleClose={handleClose}
          onSubmitUpload={onSubmitUpload}
          aspectRatioType={ImageAspectRatioTypes.FIANCE_PROFILE}
        />
      </Grid>
    </form>
  );
};

export default FianceInformation;
