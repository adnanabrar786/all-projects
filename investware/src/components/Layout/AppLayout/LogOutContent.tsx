import TextButton from '@/components/common/Button/TextButton';
import TextSm from '@/components/common/Text/TextSm';
import TextXs from '@/components/common/Text/TextXs';
import {
  StyledLogOutBoxButtonStack,
  StyledLogOutBoxSubContainer,
  StyledLogOutBoxTextBox,
} from '@/components/Layout/AppLayout/AppLayoutStyled';
import { LOGIN } from '@/constants/routes/pages.routes';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';

interface Props {
  setShowLogOut?: (value: boolean) => void;
}

const LogOutContent = ({ setShowLogOut }: Props) => {
  const router = useRouter();
  return (
    <StyledLogOutBoxSubContainer>
      <TextSm
        sx={{
          color: 'var(--text-black)',
          fontSize: '1.25rem',
          fontStyle: 500,
          lineHeight: '160%',
          letterSpacing: '0.00938rem',
        }}
        text="Confirm Logout"
      />

      <StyledLogOutBoxTextBox>
        <TextXs
          sx={{
            color: 'var(--text-black)',
            lineHeight: '166%',
            letterSpacing: '0.025rem',
            margin: '0.25rem 0.5rem',
          }}
          text="Are you sure you want to Logout?"
        />
      </StyledLogOutBoxTextBox>

      <StyledLogOutBoxButtonStack direction={'row'}>
        <TextButton
          onClick={async () => {
            await Auth.signOut();
            localStorage.removeItem('token');
            router.replace(LOGIN);
          }}
          sx={{
            color: 'var(--sky-blue)',
            width: 'auto',
          }}
          text="YES"
        />
        <TextButton
          onClick={async () => {
            if (setShowLogOut) {
              setShowLogOut(false);
            }
          }}
          sx={{
            color: 'var(--text-grey-100)',
            width: 'auto',
          }}
          text="CANCEL"
        />
      </StyledLogOutBoxButtonStack>
    </StyledLogOutBoxSubContainer>
  );
};

export default LogOutContent;
