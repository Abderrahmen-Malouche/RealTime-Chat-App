import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/storage"; // Ensure the correct import path
import { storage } from "../config/firebase"; // Ensure storage is imported properly

const upload = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, `images/${date.getTime()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at:", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
