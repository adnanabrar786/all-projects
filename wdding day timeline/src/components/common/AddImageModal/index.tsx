import { AppLoader } from 'components/common/AppLoader';
import AppModal from 'components/common/AppModal';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { CircleStencil, Cropper, CropperRef, ImageRestriction } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { useDropzone } from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { ImageAspectRatioTypes } from 'utils/enums';
import { AppText, ButtonText } from 'utils/enums/text';

type TAddImageModal = {
  open: boolean;
  loading: boolean;
  defaultImage?: string;
  handleClose: () => void;
  aspectRatioType?: string;
  onSubmitUpload: (file: any) => Promise<void>;
  setName: Dispatch<SetStateAction<string>>;
  userProfile?: boolean;
  rectangular?: boolean;
};

const AddImageModal = ({
  open,
  loading,
  setName,
  handleClose,
  defaultImage,
  onSubmitUpload,
  aspectRatioType,
  userProfile,
  rectangular,
}: TAddImageModal) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [croppedFile, setCroppedFile] = useState<Blob | null>(null);

  const [acceptedFiles, setAcceptedFiles] = useState<any>();
  const [cropperStep, setCropperStep] = useState<'ADD' | 'EDIT' | 'CONFIRM' | 'UPLOAD'>('ADD');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setName(acceptedFiles[0].name);
      setAcceptedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      setCropperStep('EDIT');
    },
  });

  const onChange = useCallback(
    (cropper: CropperRef) => {
      const canvas = cropper.getCanvas();
      if (canvas)
        canvas.toBlob((blob) => {
          setFile(blob);
        });
      else setFile(acceptedFiles[0]);
    },
    [acceptedFiles],
  );

  const uploadFile = useCallback(async () => {
    setCropperStep('UPLOAD');
    await onSubmitUpload(file);
    handleClose();
    setAcceptedFiles('');
    if (!loading) setCropperStep('ADD');
  }, [file, handleClose, loading, onSubmitUpload]);

  const getModalTitleType = () => {
    switch (aspectRatioType) {
      case ImageAspectRatioTypes.PROFILE:
        return 'profile';
      case ImageAspectRatioTypes.FIANCE_PROFILE:
        return "fiance's profile";
      case ImageAspectRatioTypes.COVER:
        return 'cover';
    }
  };

  const renderCoverPhotoTitle = useMemo(() => {
    switch (cropperStep) {
      case 'ADD':
        return (
          <>
            <p className="capitalize text-2xl mb-2">{`Add your ${getModalTitleType()} photo`}</p>
            <p className="text-xs">{AppText.UPLOAD_YOUR_FAVORITE_PHOTO}</p>
          </>
        );
      case 'EDIT':
        return (
          <>
            <p className="capitalize text-2xl mb-2">
              {`Edit your
                ${getModalTitleType()}
                photo`}
            </p>
            <p className="text-xs">
              {`Crop or resize your
                ${getModalTitleType()}
                photo`}
            </p>
          </>
        );
      case 'CONFIRM':
        return <p className="capitalize text-w_2xl xl:text-2xl mb-2">{ButtonText.UPLOAD_PHOTO}</p>;

      default:
        return <></>;
    }
  }, [cropperStep]);

  const renderCenterComponent = useMemo(() => {
    const circleProps = {
      stencilComponent: CircleStencil,
      aspectRatio: { maximum: 1, minimum: 1 },
    };

    const rectangleProps = {
      aspectRatio: { maximum: 4, minimum: 3 },
    };

    switch (cropperStep) {
      case 'ADD':
        return (
          <div
            {...getRootProps()}
            className="cursor-pointer w-5/6 m-auto h-44 border-2 border-dashed border-blue_eye rounded-3xl mt-6 flex justify-center items-center mb-8"
          >
            <input {...getInputProps()} />
            <div>
              <p className="text-purple text-w_2xl xl:text-2xl font-medium  tracking-[0.01em]">{AppText.ADD_PHOTO}</p>
            </div>
          </div>
        );
      case 'EDIT':
        return (
          <div className="px-8 my-4">
            <Cropper
              crossOrigin="anonymous"
              style={{ height: 250, width: '100%' }}
              {...(aspectRatioType !== ImageAspectRatioTypes.COVER ? circleProps : rectangleProps)}
              src={acceptedFiles ? acceptedFiles[0]?.preview : defaultImage}
              checkOrientation={false}
              transformImage={{
                adjustStencil: false,
              }}
              onChange={onChange}
              imageRestriction={ImageRestriction.stencil}
            />
          </div>
        );
      case 'CONFIRM':
        if (croppedFile)
          return (
            <>
              {rectangular ? (
                <div
                  className={`relative px-8 my-4  mx-auto ${userProfile ? 'h-[160px] w-[300px] rounded-[6px]' : 'h-[160px] w-[300px] overflow-hidden rounded-[6px]'}`}
                >
                  <Image src={URL.createObjectURL(croppedFile)} alt="Wedding Cover" layout="fill" />
                </div>
              ) : (
                <div
                  className={`${
                    userProfile ? 'w-44 h-44' : 'w-44 h-44'
                  } relative px-8 my-4 mx-auto  rounded-full overflow-hidden`}
                >
                  <Image
                    src={URL.createObjectURL(croppedFile)}
                    alt="Wedding Cover"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}
            </>
          );
        return <></>;
      default:
        return <></>;
    }
  }, [
    acceptedFiles,
    aspectRatioType,
    croppedFile,
    cropperStep,
    defaultImage,
    getInputProps,
    getRootProps,
    onChange,
    userProfile,
  ]);

  const renderButton = useMemo(() => {
    switch (cropperStep) {
      case 'ADD':
        return (
          <div className="flex cursor-pointer bg-secondary text-white rounded-full py-3 px-4" {...getRootProps()}>
            <div className="flex justify-center font-medium text-2xl mr-2">
              <IoIosAddCircleOutline />
            </div>
            <div id="browse-photo-div" className="flex justify-center font-medium text-white browse-photo-div">
              <input {...getInputProps()} />
              <button id="browse-photo" className="browse-photo">
                {ButtonText.BROWSE_PHOTO}
              </button>
            </div>
          </div>
        );
      case 'EDIT':
        return (
          <div className="flex gap-10">
            <div
              id="cancel-button-div"
              className="flex cursor-pointer w-32 justify-center border-secondary border text-secondary rounded-full py-3 px-4 cancel-button-div"
              onClick={() => {
                setAcceptedFiles(null);
                setCropperStep('ADD');
              }}
            >
              <button id="cancel-button" className="cancel-button">
                {ButtonText.CANCEL}
              </button>
            </div>
            <div
              id="crop-button-div"
              className="flex cursor-pointer w-32 justify-center bg-secondary text-white rounded-full py-3 px-4 crop-button-div"
              onClick={() => {
                setCroppedFile(file);
                setAcceptedFiles(null);
                setCropperStep('CONFIRM');
              }}
            >
              <button id="crop-button" className="crop-button">
                {ButtonText.CROP}
              </button>
            </div>
          </div>
        );
      case 'CONFIRM':
        return (
          <div className="sm:flex sm:gap-10 sm:relative text-center">
            <div
              className="mb-2 sm:mb-0 flex cursor-pointer border-secondary border text-secondary rounded-full py-3 px-4"
              onClick={() => {
                setAcceptedFiles(null);
                setCropperStep('ADD');
              }}
            >
              <button id="change-button" className="change-button text-w_sm1 xl:text-base">
                {ButtonText.CHANGE_PHOTO}
              </button>
              <div className="flex justify-center font-medium text-2xl ml-2">
                <AiFillCamera />
              </div>
            </div>
            <div className="flex cursor-pointer bg-secondary text-white rounded-full py-3 px-4" onClick={uploadFile}>
              <div className="flex justify-center font-medium text-2xl mr-2">
                <IoIosAddCircleOutline />
              </div>
              <div id="upload-button-div" className="flex justify-center font-medium text-white upload-button-div">
                <button id="upload-button" className="upload-button text-w_sm1 xl:text-base">
                  {ButtonText.UPLOAD_PHOTO}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <></>;
    }
  }, [cropperStep, file, getInputProps, getRootProps, uploadFile]);

  return (
    <AppModal
      open={open}
      onClose={() => {
        setAcceptedFiles('');
        setCropperStep('ADD');
        handleClose();
      }}
      className={`absolute rounded-3xl top-[50%] left-[50%]   ${
        userProfile ? 'w-[95%] sm:w-[60%] md:w-[40%] lg:w-[30%]' : 'w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]'
      } -translate-x-1/2 -translate-y-1/2 block pb-10 overflow-auto bg-white outline-none overflow-y-auto`}
    >
      <div>
        <div className="text-center text-purple tracking-[0.01em] font-medium">{renderCoverPhotoTitle}</div>
        {renderCenterComponent}
        <div className="grid justify-center px-5">
          {loading ? (
            <AppLoader
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
              }}
              size={40}
            />
          ) : (
            renderButton
          )}
        </div>
      </div>
    </AppModal>
  );
};
export default AddImageModal;
