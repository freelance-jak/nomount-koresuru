import html2canvas from "html2canvas";
import { ChangeEvent, useState } from "react";
import { Input } from "src/components/Input";
import { Button } from "src/components/Button";
import { Layout } from "src/components/layout";
import { PieChart } from "src/components/piechart";

type timeTable = {
  item: string;
  time: number;
  color: string;
};

const Home = () => {
  const [timeTable, setTimeTable] = useState<timeTable[]>([
    { item: "REACT", time: 7, color: "bg-blue-600" },
    { item: "ブログ書く", time: 4, color: "bg-red-600" },
    { item: "その他", time: 7, color: "bg-green-600" },
    { item: "睡眠", time: 8, color: "bg-yellow-600" },
  ]);

  const onChangeItem = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newData = [...timeTable];
    newData[idx].item = e.target.value;
    setTimeTable(newData);
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newData = [...timeTable];
    newData[idx].time = Number(e.target.value);
    setTimeTable(newData);
  };

  const screenshot = () => {
    const target = document.getElementById("capture");
    if (!target) {
      alert("nothing");
      return;
    }
    html2canvas(target).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const result = document.getElementById("result");
      if (!result) {
        alert("nothing");
        return;
      }
      result.setAttribute("src", imgData);
    });
  };

  const screenshot2 = () => {
    const target = document.getElementById("capture");
    if (!target) {
      alert("nothing");
      return;
    }
    html2canvas(target).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      uploadFile(imgData);
    });
  };

  // *********** Upload file to Cloudinary ******************** //
  // https://codepen.io/team/Cloudinary/pen/QgpyOK
  const uploadFile = (file: any) => {
    // function uploadFile(file) {
    const cloudName = "demo";
    const unsignedUploadPreset = "doc_codepen_example";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    //   // Reset the upload progress bar
    //   document.getElementById("progress").style.width = 0;

    //   // Update progress (can be used to show progress indicator)
    //   xhr.upload.addEventListener("progress", (e) => {
    //     const progress = Math.round((e.loaded * 100.0) / e.total);
    //     document.getElementById("progress").style.width = progress + "%";

    //     console.log(`fileuploadprogress data.loaded: ${e.loaded},
    // data.total: ${e.total}`);
    //   });
    // xhr.onreadystatechange = function (e) {

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
        const gallery = document.getElementById("gallery");
        if (!gallery) {
          alert("nothing");
          return;
        }
        gallery.innerHTML = url;
        const result = document.getElementById("result");
        if (!result) {
          alert("nothing");
          return;
        }
        result.setAttribute("src", url);
        const share = document.getElementById("share");
        if (!share) {
          alert("nothing");
          return;
        }
        // https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Ftoretama.jp%2Fsns-twitter-share.html&ref_src=twsrc%5Etfw&text=Twitter%20で「シェア（共有）」してもらうボタンを設置する方法&tw_p=tweetbutton&url=http%3A%2F%2Ftoretama.jp%2Fsns-twitter-share.html
        // <a href="http://twitter.com/share?url=[シェアするURL]&text=[ツイート内テキスト]&via=[ツイート内に含むユーザ名]&related=[ツイート後に表示されるユーザー]&hashtags=[ハッシュタグ]" target="_blank">ツイート</a>
        share.setAttribute("href", `http://twitter.com/share?url=${url}&text=今日のコレスル&hashtags=コレスル`);
        // share.href = `http://twitter.com/share?url=${url}&text=今日のコレスル&hashtags=コレスル`;
        // gallery.appendChild(img);
      }
    };

    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", file);
    xhr.send(fd);
  };

  return (
    <Layout>
      <div>
        <Button className="p-2 bg-red-300" onClick={screenshot}>
          Screenshot
        </Button>
        <Button className="p-2 bg-blue-300" onClick={screenshot2}>
          Screenshot2
        </Button>
        <div className="w-80 shadow-md m-auto my-10 ">
          <h1 className="bg-red-400 text-white text-2xl text-center p-3">コレスル</h1>
          <div id="capture">
            <PieChart timeTables={timeTable} />
          </div>

          {timeTable.map((obj, idx) => {
            return (
              <div key={idx} className="flex bg-gray-900 px-4">
                <div className="w-1/2 p-1 text-white">項目: {obj.item}</div>
                <div className="w-1/2 p-1 text-white">時間: {obj.time}</div>
              </div>
            );
          })}

          <div className="p-3 bg-gray-200">
            {timeTable.map((obj, idx) => {
              return (
                <div key={idx} className="flex justify-center w-72 m-auto">
                  <span className={`w-12 h-12 text-white shadow p-2 rounded m-1 inline-block ${obj.color}`}></span>
                  <Input
                    onChange={(e) => {
                      onChangeItem(e, idx);
                    }}
                    value={obj.item}
                    className="w-40 bg-red-200 shadow-inner rounded p-2 m-1 "
                    placeholder="項目を入れる"
                  />
                  <Input
                    value={obj.time}
                    onChange={(e) => {
                      onChangeTime(e, idx);
                    }}
                    className="w-10 bg-blue-200 shadow-inner rounded p-2 m-1 "
                  />
                  <div className="flex items-center">
                    <p className="text-xl">H</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            className="p-2 bg-green-200 inline-block"
            id="share"
            href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw"
          >
            Share
          </a>
        </div>

        <div className="w-80 m-auto">
          <p>Result image</p>
          <div id="gallery" />
          <img alt="outimage" id="result" src="" width="300px" height="300px" />
        </div>
      </div>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
