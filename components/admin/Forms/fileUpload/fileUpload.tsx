import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";

interface FileUploadProps {
  route: string;
}
const FileUpload = ({ route }: FileUploadProps) => {
  // const FileUpload = ({route}) => {
  const [value, setValue] = useState(0);
  const [picture, setPicture] = useState();

  const uploadFile = (route: string, file: any) => {
    const storageRef = ref(storage, route);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Archivo subido a firabase storage");
    });
  };

  return (
    <div>
      <progress value={value} max="100"></progress>
      <br />
      <input
        type="file"
        onChange={(e) => uploadFile(route, e.target.files?.[0])}
      />
      <br />
      <img width="320" src={picture} alt="image" />
    </div>
  );
};

export default FileUpload;
