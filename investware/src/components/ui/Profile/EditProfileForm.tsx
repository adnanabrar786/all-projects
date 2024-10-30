import CustomButton from '@/components/common/Button/CustomButton';
import OutLineButton from '@/components/common/Button/OutLineButton';
import Input from '@/components/common/Input/Input';
import { StyledSignUpFormikError } from '@/components/common/StyledCommons';
import TextXs from '@/components/common/Text/TextXs';
import {
  StyledProfileButtonStack,
  StyledProfileContainer,
  StyledProfileInputContainer,
  StyledProfileSignUpText,
  StyledProfileSubContainer,
} from '@/components/ui/Profile/profileStyled';
import { StyledHalfInput, StyledTwoInput } from '@/components/ui/signUp/signUpStyled';
import { EDIT_FORM_SCHEMA } from '@/config/validation';
import { COMMON_MESSAGES } from '@/constants/locales';
import { TOAST_MESSAGES } from '@/constants/locales/toast_message';
import { toastError, toastSuccess } from '@/constants/toaster';
import useUserData from '@/hooks/useUserData';
import { IUser } from '@/interfaces/IUser';
import { IEditProfile } from '@/interfaces/profile';
import { EditUser } from '@/services/user.service';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';

interface Props {
  showEditProfile: boolean;
  setShowEditProfile: (showEditProfile: boolean) => void;
  user: IUser | null;
}

const EditProfileForm = ({ showEditProfile, setShowEditProfile, user }: Props) => {
  const { refetchUser } = useUserData();
  const handleClick = () => {
    if (!mutation.isPending) {
      mutation.mutate();
    }
  };

  const formik = useFormik<IEditProfile>({
    initialValues: {
      first_name: user?.first_name ? user?.first_name : String(),
      last_name: user?.last_name ? user?.last_name : String(),
      company_name: user?.company_name ? user?.company_name : String(),
      email: user?.email ? user?.email : String(),
    },
    validationSchema: EDIT_FORM_SCHEMA(),
    onSubmit: handleClick,
    enableReinitialize: true,
  });

  const mutation = useMutation({
    mutationFn: () =>
      EditUser({
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
        company_name: formik.values.company_name,
      }),
    onSuccess: async (data) => {
      if (data) {
        toastSuccess(TOAST_MESSAGES.UPDATE_USER);
        await refetchUser();
        setShowEditProfile(false);
      }
    },
    onError: (error) => {
      if (error) {
        toastError(TOAST_MESSAGES.INTERNAL_SERVER_ERROR);
      }
    },
  });

  return (
    <>
      <StyledProfileContainer>
        <Stack sx={{ width: { md: 'auto', xs: '100%' } }} component="form" onSubmit={formik.handleSubmit}>
          <StyledProfileSubContainer>
            <StyledProfileSignUpText>Edit Profile</StyledProfileSignUpText>
            <StyledProfileInputContainer>
              <StyledTwoInput>
                <StyledHalfInput>
                  <Input
                    label={COMMON_MESSAGES.FIRST_NAME}
                    type="text"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  />
                  {formik.errors.first_name && formik.touched.first_name && (
                    <StyledSignUpFormikError>
                      <TextXs
                        sx={{
                          color: 'var(--red)',
                        }}
                        text={String(formik.errors.first_name)}
                      />
                    </StyledSignUpFormikError>
                  )}
                </StyledHalfInput>
                <StyledHalfInput>
                  <Input
                    label={COMMON_MESSAGES.LAST_NAME}
                    type="text"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  />
                  {formik.errors.last_name && formik.touched.last_name && (
                    <StyledSignUpFormikError>
                      <TextXs
                        sx={{
                          color: 'var(--red)',
                        }}
                        text={String(formik.errors.last_name)}
                      />
                    </StyledSignUpFormikError>
                  )}
                </StyledHalfInput>
              </StyledTwoInput>
              <Stack>
                <Input
                  disabled={true}
                  id="outlined-disabled"
                  label={COMMON_MESSAGES.EMAIL_ADDRESS}
                  type="email"
                  name="email"
                  value={formik.values.email}
                />
              </Stack>
              <Stack>
                <Input
                  label={COMMON_MESSAGES.COMPANY_NAME}
                  type="text"
                  name="company_name"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                />

                {formik.errors.company_name && formik.touched.company_name && (
                  <StyledSignUpFormikError>
                    <TextXs
                      sx={{
                        color: 'var(--red)',
                      }}
                      text={String(formik.errors.company_name)}
                    />
                  </StyledSignUpFormikError>
                )}
              </Stack>
            </StyledProfileInputContainer>

            <StyledProfileButtonStack direction={'row'}>
              <CustomButton
                loading={mutation.isPending}
                type="submit"
                text="Save Profile"
                sx={{
                  marginTop: '2.06rem',
                  width: '100%',
                }}
              />

              <OutLineButton
                onClick={() => {
                  setShowEditProfile(!showEditProfile);
                }}
                text="Back To Profile"
                sx={{
                  marginTop: '2.06rem',
                  width: '100%',
                }}
              />
            </StyledProfileButtonStack>
          </StyledProfileSubContainer>
        </Stack>
      </StyledProfileContainer>
    </>
  );
};

export default EditProfileForm;
