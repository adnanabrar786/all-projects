import { Grid } from '@mui/material';
import { Users } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddImageModal from 'components/common/AddImageModal';
import { ICreateWeddingCover } from 'interfaces/image';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiCamera } from 'react-icons/hi';
import ImageService from 'services/image.service';
import { CreateImagePath, UploadAsset, createFileObjectURL } from 'services/storage.service';
import { useUserInfo } from 'state/useUser';
import { useStoreWedding, useWedInfo } from 'state/useWedding';
import { ImageAspectRatioTypes } from 'utils/enums';
import { ERROR_MESSAGES } from 'utils/enums/errorMessages';
import { REACT_QUERY_KEYS } from 'utils/enums/reactQueryKeys';
import { AppText } from 'utils/enums/text';
import { errorToast, successToast } from 'utils/toast';
import ShowAppLoaderOrContent from '../ShowAppLoaderOrContent';

function Banner() {
  const queryClient = useQueryClient();
  const imageService = new ImageService();

  const [name, setName] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<Users | null>(null);
  const weddingInfo = useWedInfo();
  const { fetchWedInfo } = useStoreWedding();
  const { userInfo, error, isLoading } = useUserInfo();

  useEffect(() => {
    if (error) {
      errorToast('Error: Getting User');
      return;
    }
    if (userInfo) setUserData(userInfo!);
  }, [userInfo]);

  const createWeddingCover = useMutation(
    async (body: ICreateWeddingCover) => {
      await imageService.CreateWeddingCover(body);
    },
    {
      onSuccess: async () => {
        setLoading(false);
        handleClose();
        handleSubmissionMessage();
      },

      onError: () => {
        errorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      },
    },
  );

  const onSubmitUpload = async (file: any) => {
    try {
      if (!file) {
        return;
      }

      const imgFile = {
        url: createFileObjectURL(file),
      };

      const path = CreateImagePath(userData!.id, 'wedding/cover', new Date().toISOString() + name);

      setLoading(true);
      const result = await UploadAsset(path, 'public', imgFile.url);

      const body: ICreateWeddingCover = {
        data: {
          wedding_cover: 'public/' + result.key,
        },
      };
      createWeddingCover.mutate(body);
    } catch (ex) {
      errorToast('Something went wrong');
    }
  };

  const handleSubmissionMessage = () => {
    successToast('Your image is uploaded');
    queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.WEDDING_DETAILS] });
    fetchWedInfo();
  };

  const openAddImageModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} lg={6} order={{ xs: 1, lg: 2 }}>
        <ShowAppLoaderOrContent data={isLoading} size={40}>
          <div className="relative">
            {weddingInfo.weddingInfo &&
            weddingInfo.weddingInfo.wedding_cover &&
            weddingInfo.weddingInfo.wedding_cover.length ? (
              <div className="relative h-[150px] sm:h-[340px] md:h-[360px] lg:h-[280px]">
                <Image
                  src={weddingInfo.weddingInfo.wedding_cover}
                  priority={true}
                  alt="cover"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl lg:rounded-l-none lg:rounded-r-2xl"
                />
              </div>
            ) : (
              <div className="p-[15px] relative h-[200px] sm:h-[340px] md:h-[360px] lg:h-[280px] bg-anti_flash_white rounded-t-2xl flex flex-col justify-center items-center lg:rounded-l-none lg:rounded-r-2xl sm:shadow-lg">
                <svg
                  className="w-[60px] xl:w-[80px] h-[50px] xl:h-[70px]"
                  viewBox="0 0 80 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 19.8006C13.9998 18.5121 14.495 17.2776 15.3743 16.3748C16.2536 15.4721 17.443 14.977 18.675 15.0008C20.1347 14.9927 21.5276 15.6401 22.5 16.7785C23.4724 15.6401 24.8653 14.9927 26.325 15.0008C27.557 14.977 28.7465 15.4721 29.6257 16.3748C30.505 17.2776 31.0002 18.5121 31 19.8006C31 24.5612 25.5779 28.1557 22.5 31C19.429 28.1317 14 24.5648 14 19.8006Z"
                    fill="#512F6F"
                    fillOpacity="0.35"
                  />
                  <path
                    d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10V60C0 62.6522 1.05357 65.1957 2.92893 67.0711C4.8043 68.9464 7.34784 70 10 70H70C72.6522 70 75.1957 68.9464 77.0711 67.0711C78.9464 65.1957 80 62.6522 80 60V10C80 7.34784 78.9464 4.8043 77.0711 2.92893C75.1957 1.05357 72.6522 0 70 0H10ZM70 5C71.3261 5 72.5979 5.52678 73.5355 6.46447C74.4732 7.40215 75 8.67392 75 10V42.5L56.115 32.765C55.6461 32.5301 55.1152 32.4486 54.5975 32.5321C54.0797 32.6155 53.6013 32.8597 53.23 33.23L34.68 51.78L21.38 42.92C20.8998 42.6003 20.3238 42.4565 19.7497 42.513C19.1756 42.5695 18.6387 42.8228 18.23 43.23L5 55V10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5H70Z"
                    fill="#512F6F"
                    fillOpacity="0.35"
                  />
                </svg>

                <p className="mt-5 mb-1 text-w_2xl xl:text-w_4xl text-purple opacity-[35%] font-semibold">
                  {AppText.IMAGE_PLACEHOLDER}
                </p>
                <div className="flex flex-col items-center justify-center text-[12px] xl:text-[16px] font-medium sm:inline">
                  <span className="text-purple underline cursor-pointer" onClick={openAddImageModal} id="upload">
                    {AppText.UPLOAD}
                  </span>
                  <span className="text-purple opacity-[35%] mx-1 text-center w-[90%]">{AppText.PHOTO_OF_TWO}</span>
                </div>
              </div>
            )}
            <div className="bg-white absolute bottom-0 right-0 text-deep_purple w-w_9xl h-w_h0 text-3xl rounded-full border border-deep_purple flex justify-center items-center m-2 sm:m-4">
              <HiCamera fontSize={23} style={{ cursor: 'pointer' }} onClick={openAddImageModal} id="upload-icon" />
            </div>
          </div>
        </ShowAppLoaderOrContent>
        <AddImageModal
          rectangular={true}
          open={isOpen}
          loading={loading}
          setName={setName}
          handleClose={handleClose}
          onSubmitUpload={onSubmitUpload}
          aspectRatioType={ImageAspectRatioTypes.COVER}
        />
      </Grid>
    </>
  );
}

export default Banner;
