import { CircularProgress, Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLoader } from 'components/common/AppLoader';
import Input from 'components/common/InputField';
import PhoneNumberInput, {
  handlePhoneInputHelperTextValidNumber,
  handleValidNumberError,
} from 'components/common/PhoneNumberInput';
import { useFormik } from 'formik';
import { IPersonalInfoForm } from 'interfaces/forms';
import { IUpdatePrimaryUserBody } from 'interfaces/user';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { isValidPhoneNumber } from 'react-phone-number-input';
import AccountService from 'services/account.service';
import { useStoreCouple } from 'state/useCouple';
import { useStore, useUserInfo } from 'state/useUser';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { AppText, ButtonText } from 'utils/enums/text';
import { errorToast, successToast } from 'utils/toast';
import { PersonalInfoValidation } from 'validators';

const PersonalInformation = () => {
  const accountService = new AccountService();
  const [editProfile, setEditProfile] = useState(false);

  const [userId, setUserId] = useState<string>('');
  const user = useUserInfo();
  const { fetchUserInfo } = useStore();
  const { fetchCoupleInfo } = useStoreCouple();
  const queryClient = useQueryClient();

  // API Queries and Mutations
  useEffect(() => {
    if (!user.isInit && user.error) {
      errorToast(ERROR_MESSAGES.GETTING_USER);
    }
    if (user.userInfo) {
      const _res = user.userInfo;
      formik.setValues({
        first_name: _res.first_name ?? '',
        last_name: _res.last_name ?? '',
        email: _res.email ?? '',
        number: _res.phone ?? '',
      });
      setUserId(_res.id);
    }
  }, [user.userInfo]);

  const updatePrimaryUser = useMutation(
    async (body: IUpdatePrimaryUserBody) => {
      await accountService.UpdatePrimaryUser(body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.DETAIL_USER] });
        fetchUserInfo();
        fetchCoupleInfo();
        successToast(SUCCESS_MESSAGES.PROFILE_UPDATED);
        setEditProfile(!editProfile);
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      number: '',
    },
    validationSchema: PersonalInfoValidation(),
    onSubmit: async (values: IPersonalInfoForm) => {
      if (values.number) {
        const check = isValidPhoneNumber(values.number);
        if (!check) {
          formik.setFieldError('number', 'invalid phone number');
          return;
        }
      }

      const body: IUpdatePrimaryUserBody = {
        data: {
          id: userId,
          phone: values.number ? values.number : '',
          last_name: values.last_name,
          first_name: values.first_name,
        },
      };
      updatePrimaryUser.mutate(body);
    },
  });

  if (user.isLoading) {
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

  const handleCancelClick = () => {
    setEditProfile(!editProfile);
    formik.setFieldTouched('number', false);
    formik.setValues({
      first_name: user.userInfo ? user.userInfo.first_name ?? '' : '',
      last_name: user.userInfo ? user.userInfo.last_name ?? '' : '',
      email: user.userInfo ? user.userInfo.email ?? '' : '',
      number: user.userInfo ? user.userInfo.phone ?? '' : '',
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.FIRST_NAME} *</span>
          <Input
            id="first_name"
            name="first_name"
            className="mt-2"
            value={formik.values.first_name}
            helperText={formik.touched.first_name && formik.errors.first_name}
            error={Boolean(formik.touched.first_name && formik.errors.first_name)}
            onChange={formik.handleChange}
            placeholder="First Name"
            disabled={!editProfile}
          />
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.LAST_NAME}</span>
          <Input
            id="last_name"
            name="last_name"
            className="mt-2"
            value={formik.values.last_name}
            helperText={formik.touched.last_name && formik.errors.last_name}
            error={Boolean(formik.touched.last_name && formik.errors.last_name)}
            onChange={formik.handleChange}
            placeholder="Last Name"
            disabled={!editProfile}
          />
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.EMAIL} *</span>
          <Input
            id="email"
            name="email"
            className="mt-2"
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
            onChange={formik.handleChange}
            placeholder="Email Address"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={5} px={'2rem'} pb={'1rem'} mt={'0.45rem'}>
          <span className="text-w_sm xl:text-sm text-gray-700 font-medium">{AppText.MOBILE_NUMBER}</span>
          <PhoneNumberInput
            placeholder="Phone"
            name="number"
            value={formik.values.number}
            handleBlur={formik.handleBlur}
            error={handleValidNumberError(formik.touched.number, formik.values.number)}
            helperText={handlePhoneInputHelperTextValidNumber(formik.touched.number, formik.values.number)}
            handleChange={(value) => {
              formik.setFieldValue('number', value);
              formik.setFieldTouched('number', false);
            }}
            id="number"
            disabled={!editProfile}
          />
        </Grid>
        <Grid item xs={12} mt={'1rem'}>
          <div
            id="personal-info-btn-div"
            className="flex items-center justify-center md:justify-start mx-6 my-[10px] personal-info-btn-div"
          >
            {!editProfile ? (
              <button
                disabled={updatePrimaryUser.isLoading}
                onClick={() => {
                  setEditProfile(!editProfile);
                }}
                className="text-w_sm xl:text-w_0xl cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-[9px] personal-info-btn"
                id="personal-info-btn"
              >
                <FiEdit className="text-w_base1 xl:text-w_2xl mr-2" />
                {ButtonText.EDIT_PROFILE}
              </button>
            ) : (
              <div id="btn-div" className="flex gap-6 items-center mx-4 btn-div">
                {updatePrimaryUser.isLoading ? (
                  <CircularProgress sx={{ color: '#00D5D4' }} />
                ) : (
                  <>
                    <button
                      type="submit"
                      className="cursor-pointer flex justify-center items-center bg-secondary text-white rounded-full px-8 py-2 save-btn"
                      id="save-btn"
                    >
                      {ButtonText.SAVE}
                    </button>
                    <button
                      id="cancel-btn"
                      onClick={handleCancelClick}
                      className="cancel-btn cursor-pointer flex justify-center items-center bg-white border border-secondary text-secondary rounded-full px-8 py-2"
                    >
                      {ButtonText.CANCEL}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalInformation;
