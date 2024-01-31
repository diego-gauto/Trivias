import React, { Dispatch, SetStateAction, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";

interface Option {
  isVisible: boolean | null;
  label: string;
  options: string[];
}

interface Form {
  name: string;
  title: string;
  subtitle: string;
  createdAt: string;
  editedAt: string;
  img: {
    source: string;
    isVisible: boolean | null;
  };
  optionsArray: Option[];
  redirect: {
    type: "thankYouPage" | "customLink";
    link: string;
    textButton: string;
  };
}

interface FileUploadProps {
  route: string;
  updateFormImg: Dispatch<SetStateAction<Form | null>>;
}

const FileUpload = ({ route, updateFormImg }: FileUploadProps) => {
  const uploadFile = async (route: string, file: any) => {
    const storageRef = ref(storage, route);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const fileUrl = await uploadFile(route, e.target.files?.[0]);
      console.log(fileUrl);
      updateFormImg((prevForm) => ({
        ...(prevForm as Form),
        img: { ...prevForm!.img, source: fileUrl },
      }));
    } catch (error) {
      console.log(error);
    }
    const fileRef = await uploadFile(route, e.target.files?.[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default FileUpload;
