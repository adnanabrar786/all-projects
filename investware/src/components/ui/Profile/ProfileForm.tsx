import OutLineButton from '@/components/common/Button/OutLineButton';
import Input from '@/components/common/Input/Input';

import {
  StyledProfileButtonStack,
  StyledProfileContainer,
  StyledProfileInputContainer,
  StyledProfileSignUpText,
  StyledProfileSubContainer,
} from '@/components/ui/Profile/profileStyled';
import { StyledHalfInput, StyledTwoInput } from '@/components/ui/signUp/signUpStyled';
import { COMMON_MESSAGES } from '@/constants/locales';
import { IUser } from '@/interfaces/IUser';
import { Stack } from '@mui/material';

interface Props {
  setShowChangePasswordModal: (showChangePasswordModal: boolean) => void;
  setShowEditProfile: (value: boolean) => void;
  user: IUser | null;
}

const ProfileForm = ({ setShowChangePasswordModal, setShowEditProfile, user }: Props) => {
  return (
    <StyledProfileContainer>
      <StyledProfileSubContainer>
        <StyledProfileSignUpText>My Profile</StyledProfileSignUpText>
        <StyledProfileInputContainer>
          <StyledTwoInput>
            <StyledHalfInput>
              <Input
                id="outlined-disabled"
                label={COMMON_MESSAGES.FIRST_NAME}
                type="text"
                name="first_name"
                value={user?.first_name}
                sx={{ pointerEvents: 'none' }}
              />
            </StyledHalfInput>
            <StyledHalfInput>
              <Input
                id="outlined-disabled"
                label={COMMON_MESSAGES.LAST_NAME}
                type="text"
                name="last_name"
                value={user?.last_name}
                sx={{ pointerEvents: 'none' }}
              />
            </StyledHalfInput>
          </StyledTwoInput>
          <Stack>
            <Input
              id="outlined-disabled"
              label={COMMON_MESSAGES.EMAIL_ADDRESS}
              name="email"
              value={user?.email}
              sx={{ pointerEvents: 'none' }}
            />
          </Stack>
          <Stack>
            <Input
              id="outlined-disabled"
              label={COMMON_MESSAGES.COMPANY_NAME}
              name="company_name"
              value={user?.company_name}
              sx={{ pointerEvents: 'none' }}
            />
          </Stack>
        </StyledProfileInputContainer>

        <StyledProfileButtonStack direction={'row'}>
          <OutLineButton
            onClick={() => setShowEditProfile(true)}
            text="Edit Profile"
            sx={{
              marginTop: '2.06rem',
            }}
          />
          <OutLineButton
            onClick={() => setShowChangePasswordModal(true)}
            text="Change password"
            sx={{
              marginTop: '2.06rem',
            }}
          />
        </StyledProfileButtonStack>
      </StyledProfileSubContainer>
    </StyledProfileContainer>
  );
};

export default ProfileForm;
