import ChangePasswordModal from '@/components/ui/Profile/ChangePasswordModal';
import EditProfileForm from '@/components/ui/Profile/EditProfileForm';
import ProfileForm from '@/components/ui/Profile/ProfileForm';
import useUserData from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { user } = useUserData();
  return (
    <>
      {showEditProfile ? (
        <EditProfileForm showEditProfile={showEditProfile} setShowEditProfile={setShowEditProfile} user={user} />
      ) : (
        <>
          <ProfileForm
            setShowChangePasswordModal={setShowChangePasswordModal}
            setShowEditProfile={setShowEditProfile}
            user={user}
          />
        </>
      )}

      <ChangePasswordModal
        showChangePasswordModal={showChangePasswordModal}
        setShowChangePasswordModal={setShowChangePasswordModal}
      />
    </>
  );
};

export default Profile;
