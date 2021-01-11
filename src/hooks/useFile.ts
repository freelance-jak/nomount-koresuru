import { useCallback, useState } from "react";

export const useFile = () => {
  const [loading, setLoading] = useState(false);

  const upload = useCallback(async (blob: Blob): Promise<{ imageId: string; error: boolean }> => {
    setLoading(true);
    let imageId = "";
    let error = false;

    const formData = new FormData();
    formData.append("data", blob);

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

    return { imageId, error };
  }, []);

  return { loading, upload };
};
