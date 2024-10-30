import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropZoneContainer, ImagePickerContainer } from './styled';

type Prop = {
  setImg: any;
};
const ImagePicker = ({ setImg }: Prop) => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    setImg(files);
    // return () => files.forEach((file) => URL.revokeObjectURL(file.preview!));
  }, [files, setImg]);

  return (
    <ImagePickerContainer>
      <DropZoneContainer>
        {files.length ? (
          <></>
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Image
              width={160}
              height={160}
              className="rounded-full cursor-pointer"
              src="/images/alt-image.png"
              alt="User"
            />
          </div>
        )}
      </DropZoneContainer>
      <aside>
        {files.length ? (
          <>
            <div>
              {files.map((item, index) => (
                <div key={index}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Image
                      alt="item"
                      src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                      className="rounded-full cursor-pointer"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </aside>
    </ImagePickerContainer>
  );
};

export default ImagePicker;
