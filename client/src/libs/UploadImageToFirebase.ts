import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";

const UploadImageToFirebase = async (image: File | null, name: string) => {
  return new Promise<string>((resolve, reject) => {
    if (!image) {
      reject(new Error("Please select an image to upload."));
      return;
    }

    const storage = getStorage();
    const storagePath = "uploads/" + name;
    const storageRef = ref(storage, storagePath);

    try {
      // Uploading the file
      const uploadTask = uploadBytesResumable(storageRef, image);

      // Listening for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handling unsuccessful uploads
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
          reject(error);
        },
        async () => {
          // Handling successful upload
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadUrl);
            resolve(downloadUrl);
          } catch (error) {
            console.error("Error getting download URL:", error);
            toast.error("Failed to upload image");
            reject(error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      reject(error);
    }
  });
};

export default UploadImageToFirebase;
