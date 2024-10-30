import AppModal from "@/components/common/AppModal";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getProfileImage } from "@/store/slices/authSlice";
import { setProfileImage } from "@/store/slices/imageSlice";
import { Colors } from "@/utils/enums/colors";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useDropzone } from "react-dropzone";

type TAddImageModal = {
  open: boolean;
  loading?: boolean;
  defaultImage?: string;
  handleClose: () => void;
  onSubmitUpload: (file: File) => Promise<void>;
  setName: Dispatch<SetStateAction<string>>;
  userProfile?: boolean;
};
// type FileWithPreview = ((Blob | MediaSource) & { preview: string })[] | undefined | string | null
const AddImageModal = ({
  open,
  loading,
  setName,
  handleClose,
  defaultImage,
  onSubmitUpload,
  userProfile,
}: TAddImageModal) => {
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<Blob | null>();
  const [croppedFile, setCroppedFile] = useState<Blob | null>();
  const userData = useAppSelector((state) => state.user);

  const [acceptedFiles, setAcceptedFiles] = useState<any>();
  const [cropperStep, setCropperStep] = useState<
    "ADD" | "EDIT" | "CONFIRM" | "UPLOAD"
  >("ADD");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setName(acceptedFiles[0].name);
      setAcceptedFiles(
        acceptedFiles.map((file: Blob | MediaSource) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      setCropperStep("EDIT");
    },
  });

  const onChange = useCallback(
    (cropper: CropperRef) => {
      if (cropper.getCanvas())
        cropper.getCanvas()?.toBlob((blob: Blob | null) => {
          dispatch(getProfileImage(blob));
          // setFile(blob);
        });
      else if (acceptedFiles) {
        dispatch(getProfileImage(acceptedFiles[0]));
        // setFile(acceptedFiles[0]);
      }
    },
    [acceptedFiles],
  );

  const cropperRef = useRef<CropperRef>(null);

  const onCrop = () => {
    // setLoading(true);
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        // dispatch(getProfileImage(canvas.toDataURL()));
        dispatch(setProfileImage(canvas.toDataURL()));
        canvas?.toBlob((blob: Blob | null) => {
          // dispatch(getProfileUploadImage(blob));
          // setFile(blob);
        });
      }
    }
  };

  const uploadFile = useCallback(async () => {
    setCropperStep("UPLOAD");
    // await onSubmitUpload(file);
    handleClose();
    setAcceptedFiles("");
    if (!loading) setCropperStep("ADD");
  }, [file, handleClose, loading, onSubmitUpload]);

  const renderCoverPhotoTitle = useMemo(() => {
    switch (cropperStep) {
      case "ADD":
        return (
          <>
            <Typography
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.688rem" },
                fontWeight: "600",
                textAlign: "center",
                mx: "20px",
              }}
            >
              Add your Profile photo
            </Typography>
          </>
        );
      case "EDIT":
        return (
          <>
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {`Crop or resize your
                profile
                photo`}
            </Typography>
          </>
        );
      case "CONFIRM":
        return (
          <Typography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
            Upload Photo
          </Typography>
        );

      default:
        return <></>;
    }
  }, [cropperStep]);

  const renderCenterComponent = useMemo(() => {
    const circleProps = {
      aspectRatio: { maximum: 1, minimum: 1 },
    };

    const rectangleProps = {
      aspectRatio: { maximum: 4, minimum: 3 },
    };

    switch (cropperStep) {
      case "ADD":
        return (
          <div
            style={{
              width: "80%",
              margin: "auto",
              height: "15.5rem",
              border: `0.3rem dashed ${Colors.LIGHT_STEEL_BLUE}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "1.625rem",
            }}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography
                sx={{
                  fontSize: { xs: "1.375rem", sm: "1.75rem", md: "2.188rem" },
                  cursor: "pointer",
                }}
              >
                Add Photo
              </Typography>
            </div>
          </div>
        );
      case "EDIT":
        return (
          <Box sx={{ width: "80%" }}>
            <Cropper
              ref={cropperRef}
              crossOrigin="anonymous"
              style={{ height: 250, width: "100%" }}
              {...circleProps}
              src={acceptedFiles ? acceptedFiles[0].preview : defaultImage}
              checkOrientation={false}
              transformImage={{
                adjustStencil: false,
              }}
              // onChange={onChange}
              // onInteractionEnd={onChange}
              imageRestriction={ImageRestriction.stencil}
            />
          </Box>
        );
      case "CONFIRM":
        if (croppedFile)
          return (
            <Box
              sx={{
                position: "relative",
                paddingX: "1.3rem",
                paddingY: "0.9rem",
                marginX: "auto",
                height: userProfile
                  ? "6rem"
                  : { xs: "12.5rem", md: "15.625rem" },
                width: userProfile ? "6rem" : { xs: "12.5rem", md: "15.625" },
              }}
            >
              <Image
                src={URL.createObjectURL(croppedFile)}
                alt=" Cover"
                layout="fill"
              />
            </Box>
          );
        return <></>;
      default:
        return <></>;
    }
  }, [
    acceptedFiles,
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
      case "ADD":
        return (
          <div>
            <div
              id="browse-photo-div"
              className=" browse-photo-div"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Button
                id="browse-photo"
                className="browse-photo"
                sx={{
                  backgroundColor: Colors.ZOMP,
                  color: Colors.WHITE,
                  paddingX: "1.3rem",
                  ":hover": { backgroundColor: Colors.ZOMP },
                  borderRadius: "0.6rem",
                  height: "3rem",
                  fontSize: "1.1rem",
                }}
              >
                + Browse Photo
              </Button>
            </div>
          </div>
        );
      case "EDIT":
        return (
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
            }}
          >
            <Box
              id="cancel-button-div"
              sx={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                border: `0.06rem solid ${Colors.ZOMP}`,
                borderRadius: "0.6rem",
              }}
              onClick={() => {
                setAcceptedFiles(null);
                setCropperStep("ADD");
                if (userData.userImage) {
                  dispatch(getProfileImage(userData.userImage));
                } else {
                  dispatch(getProfileImage(""));
                }
              }}
            >
              <Button>Cancel</Button>
            </Box>
            <Box
              id="crop-button-div"
              sx={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                borderRadius: "0.6rem",
                backgroundColor: Colors.ZOMP,
                color: Colors.WHITE,
              }}
              onClick={() => {
                setCroppedFile(file as Blob);
                setAcceptedFiles(null);
                setCropperStep("CONFIRM");
              }}
            >
              <Button sx={{ color: Colors.WHITE }} onClick={onCrop}>
                Crop
              </Button>
            </Box>
          </div>
        );
      case "CONFIRM":
        return (
          <Box
            sx={{
              display: { sm: "flex" },
              position: { sm: "relative" },
              textAlign: "center",
              alignItems: "center",
              gap: "0.6rem",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                marginBottom: "0.1rem",
                display: "flex",
                border: `0.06rem solid ${Colors.ZOMP}`,
                paddingY: "0.2rem",
                paddingX: "0.6rem",
                cursor: "pointer",
                borderRadius: "0.6rem",
              }}
              onClick={() => {
                setAcceptedFiles(null);
                setCropperStep("ADD");
              }}
            >
              <Button
                id="change-button"
                className="change-button text-w_sm1 xl:text-base"
              >
                Change Photo
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                borderRadius: "0.6rem",
                backgroundColor: Colors.ZOMP,
                color: Colors.WHITE,
                paddingY: "0.3rem",
                paddingX: "0.8rem",
              }}
              onClick={uploadFile}
            >
              <Button sx={{ color: Colors.WHITE }}>Upload Photo</Button>
            </Box>
          </Box>
        );

      default:
        return <></>;
    }
  }, [cropperStep, file, getInputProps, getRootProps, uploadFile]);

  return (
    <AppModal
      width="700px"
      open={open}
      onClose={() => {
        setAcceptedFiles("");
        setCropperStep("ADD");
        handleClose();
      }}
    >
      <Box
        sx={{
          width: "100%",
          paddingBottom: "3rem",
          paddingX: { md: "2.69rem", xs: "1rem" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1.3rem",
          marginBottom: "1.3rem",
          gap: "1.875rem",
        }}
      >
        <div>{renderCoverPhotoTitle}</div>
        {renderCenterComponent}
        <div>{loading ? "loading" : renderButton}</div>
      </Box>
    </AppModal>
  );
};
export default AddImageModal;
