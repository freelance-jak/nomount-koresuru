import { useCallback, useState } from "react";

export const useFile = () => {
  const [loading, setLoading] = useState(false);

  const upload = useCallback(async (blob: Blob): Promise<{ imageUrl: string; error: boolean }> => {
    setLoading(true);
    const error = false;

    const formData = new FormData();
    formData.append("data", blob);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = JSON.parse(await response.json());
    const imageUrl = data.imageUrl;

    setLoading(false);

    return { imageUrl, error };
  }, []);

  return { loading, upload };
};
