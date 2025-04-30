import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type ProfileFileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const ProfileFileUploader = ({
  fieldChange,
  mediaUrl,
}: ProfileFileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: false, // Only allow one file for profile picture
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-start justify-center cursor-pointer "
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-row items-center justify-start gap-8">
          <img
            src={fileUrl}
            alt="Profile"
            className="w-[100px] h-[100px] rounded-full object-cover border-2 border-gray-300"
          />
          <p className="font-inter font-semibold text-[18px] leading-[140%] tracking-[0px] text-gray-500 mt-2 text-[#0095F6]">
            Change Profile Photo
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            className="w-[100px] h-[100px]"
          />
          <p className="font-inter font-semibold text-[18px] leading-[140%] tracking-[0px] text-gray-500 mt-2 text-[#0095F6]">
            Upload Profile Photo
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileFileUploader;
