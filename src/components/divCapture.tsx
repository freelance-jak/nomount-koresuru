import html2canvas from "html2canvas";

export const divCapture = (capture: string, showCapture: string) => {
  const target = document.getElementById(capture);
  if (!target) {
    alert("nothing");
    return;
  }
  html2canvas(target).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const result = document.getElementById(showCapture);
    if (!result) {
      alert("nothing");
      return;
    }
    result.setAttribute("src", imgData);
  });
};

export const divUpload = (capture: string, showCapture: string, share: string) => {
  const target = document.getElementById(capture);
  if (!target) {
    alert("nothing");
    return;
  }
  html2canvas(target).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    uploadFile(imgData, showCapture, share);
  });
};

// *********** Upload file to Cloudinary ******************** //
// https://codepen.io/team/Cloudinary/pen/QgpyOK
const uploadFile = (file: any, showCapture: string, share: string) => {
  const cloudName = "demo";
  const unsignedUploadPreset = "doc_codepen_example";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      const response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      const url = response.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      const tokens = url.split("/");
      tokens.splice(-2, 0, "w_150,c_scale");
      const img = new Image(); // HTML5 Constructor
      img.src = tokens.join("/");
      img.alt = response.public_id;
      // const gallery = document.getElementById("gallery");
      // if (!gallery) {
      //   alert("nothing");
      //   return;
      // }
      // gallery.innerHTML = url;
      const result = document.getElementById(showCapture);
      if (!result) {
        alert("nothing");
        return;
      }
      result.setAttribute("src", url);
      const shareDiv = document.getElementById(share);
      if (!shareDiv) {
        alert("nothing");
        return;
      }
      shareDiv.setAttribute("href", `http://twitter.com/share?url=${url}&text=今日のコレスル&hashtags=コレスル`);
    }
  };

  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
  fd.append("file", file);
  xhr.send(fd);
};
