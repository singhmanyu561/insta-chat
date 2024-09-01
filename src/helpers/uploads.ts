import { firebaseApp } from "@/config/firebase";
import { uploadBytes, ref, getDownloadURL, getStorage } from "firebase/storage";

export const uploadImageToFirebase = async (file: any) => {
  try {
    const storageRef = getStorage(firebaseApp);
    const storagePath = ref(storageRef, `images/${file.name}`);
    const uploadImageRef = await uploadBytes(storagePath, file);
    const downloadURL = await getDownloadURL(uploadImageRef.ref);

    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
