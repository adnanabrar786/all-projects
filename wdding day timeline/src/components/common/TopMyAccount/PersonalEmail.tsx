import { CiLocationOn } from 'react-icons/ci';

interface Props {
  email: string;
}

const PersonalEmail = ({ email }: Props) => {
  return (
    <>
      <p className="text-purple flex items-center sm:hidden">
        <span className="text-lg">
          <CiLocationOn />
        </span>
        {email.length > 16 ? email.substring(0, 14) + '...' : email}
      </p>
      <p className="text-purple flex items-center hidden sm:flex">
        <span className="text-lg">
          <CiLocationOn />
        </span>
        {email}
      </p>
    </>
  );
};

export default PersonalEmail;
