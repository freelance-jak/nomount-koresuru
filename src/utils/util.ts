import html2canvas from "html2canvas";

export const toCanvas = async (element: HTMLDivElement): Promise<HTMLCanvasElement> => {
  // 画像ズレ問題解決
  window.scrollTo(0, 0);
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
