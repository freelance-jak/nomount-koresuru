import { useCallback, useState } from "react";
import { storageRef } from "../utils/firebase";

export const useFile = () => {
  const [loading, setLoading] = useState(false);

  const upload = useCallback(async (blob: Blob): Promise<{ imageId: string; error: boolean; imageURL: string }> => {
    setLoading(true);
    let imageId = "";
    let error = false;
    let imageURL = "";

    const formData = new FormData();
    formData.append("data", blob);

    const testRef = storageRef.child("Test.png");
    const file = blob;
    try {
      const snapshot = await testRef.put(file);
      imageURL = await snapshot.ref.getDownloadURL();
      // alert(imageURL);
    } catch (err) {
      error = true;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      imageId = data.imageId;
    } catch (err) {
      error = true;
    }

    setLoading(false);

    return { imageId, error, imageURL };
  }, []);

  return { loading, upload };
};
