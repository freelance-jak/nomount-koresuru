import html2canvas from "html2canvas";

export const toCanvas = async (element: HTMLDivElement): Promise<HTMLCanvasElement> => {
  const canvas = await html2canvas(element);
  return canvas;
};

export const toBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob !== null) {
        resolve(blob);
        return;
      }
    }, "image/png");
  });
};
