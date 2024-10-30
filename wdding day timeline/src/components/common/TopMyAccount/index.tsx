import { Grid } from '@mui/material';
import { Users } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddImageModal from 'components/common/AddImageModal';
import { AppLoader } from 'components/common/AppLoader';
import { DropZoneContainer, ImagePickerContainer } from 'components/common/ImagePicker/styled';
import Banner from 'components/common/TopComponent/banner';
import { IUpdateUserProfilePicBody } from 'interfaces/user';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TiCamera } from 'react-icons/ti';
import AccountService from 'services/account.service';
import { CreateImagePath, UploadAsset, createFileObjectURL } from 'services/storage.service';
import { useStoreCouple } from 'state/useCouple';
import { useStore, useUserInfo } from 'state/useUser';
import { ImageAspectRatioTypes } from 'utils/enums';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { SUCCESS_MESSAGES } from 'utils/enums/successMessages';
import { getFileExtension } from 'utils/strings';
import { errorToast, successToast } from 'utils/toast';
import PersonalEmail from './PersonalEmail';

export default function TopMyAccounts() {
  const queryClient = useQueryClient();
  const { fetchCoupleInfo } = useStoreCouple();

  const accountService = new AccountService();

  const [name, setName] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<Users | null>(null);
  const user = useUserInfo();
  const { fetchUserInfo } = useStore();
  useEffect(() => {
    if (user.error) {
      errorToast(ERROR_MESSAGES.GETTING_USER);
      return;
    }
    if (user.userInfo) setUserDetails(user.userInfo!);
  }, [user]);

  const updateUserProfilePic = useMutation(
    async (body: IUpdateUserProfilePicBody) => {
      await accountService.UpdateProfilePic(body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.DETAIL_USER] });
        fetchCoupleInfo();
        handleSubmissionMessage();
        fetchUserInfo();
        handleClose();
      },

      onError: () => {
        errorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      },
    },
  );

  const onSubmitUpload = async (file: File) => {
    try {
      if (file) {
        const imgFile = {
          url: createFileObjectURL(file),
        };

        const image_name = Date.now() + '-profile.' + getFileExtension(name);
        const path = CreateImagePath(userDetails!.id, 'profile', image_name);

        setLoading(true);
        const result = await UploadAsset(path, 'public', imgFile.url);
        setLoading(false);

        const body: IUpdateUserProfilePicBody = {
          data: {
            id: userDetails!.id,
            profile_pic: 'public/' + result.key,
          },
        };
        updateUserProfilePic.mutate(body);
      }
    } catch (ex) {
      errorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  const handleSubmissionMessage = () => {
    successToast(SUCCESS_MESSAGES.IMAGE_UPLOADED);
    queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.DETAIL_USER] });
    fetchUserInfo();
    fetchCoupleInfo();
  };

  const openAddImageModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <Grid container sx={{ backgroundColor: 'white', borderRadius: '1rem' }}>
      <Grid
        item
        xs={12}
        lg={6}
        order={{ xs: 2, lg: 1 }}
        display={'flex'}
        alignItems={'center'}
        height={'280px'}
        sx={{
          '.image-circle': {
            height: { sm: '160px', xs: '120px' },
            width: { sm: '160px', xs: '120px' },
          },
        }}
      >
        <div className="grid grid-cols-12">
          <div className="relative pl-4 sm:pl-5 pr-5 col-span-5 sm:col-span-4">
            <div className="w-[120px] sm:w-[160px] ">
              <ImagePickerContainer>
                <DropZoneContainer>
                  <Image
                    priority={true}
                    width={160}
                    height={160}
                    className="rounded-full cursor-pointer image-circle"
                    src={userDetails && userDetails.picture ? userDetails.picture : '/images/alt-image.png'}
                    alt="User"
                    onClick={() => openAddImageModal()}
                    style={{
                      objectFit: userDetails && userDetails.picture ? 'cover' : 'unset',
                    }}
                  />
                </DropZoneContainer>
              </ImagePickerContainer>
            </div>
            <span className="bg-white absolute border-2 border-deep_purple left-[6rem] sm:left-[8rem] bottom-0 text-deep_purple w-7 h-7 sm:w-9 sm:h-9 text-3xl rounded-full flex justify-center items-center m-4 ">
              <TiCamera className="p-1" onClick={() => openAddImageModal()} style={{ cursor: 'pointer' }} />
            </span>
          </div>
          <div className="col-span-7 sm:col-span-4 flex flex-col justify-center pl-3 sm:pl-0">
            <p className="text-w_3xl xl:text-w_6xl font-bold text-purple">
              {userDetails ? userDetails.first_name : ''}
            </p>
            {userDetails && userDetails.email && <PersonalEmail email={userDetails.email} />}
          </div>
        </div>
      </Grid>
      <Banner />
      <AddImageModal
        open={isOpen}
        loading={loading}
        setName={setName}
        handleClose={handleClose}
        onSubmitUpload={onSubmitUpload}
        aspectRatioType={ImageAspectRatioTypes.PROFILE}
        userProfile={true}
        defaultImage={userDetails && userDetails.picture ? userDetails.picture : '/images/alt-image.png'}
      />
    </Grid>
  );
}
