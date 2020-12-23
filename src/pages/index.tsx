import { useState, ChangeEvent } from "react";
import html2canvas from "html2canvas";

import { Layout } from "src/components/layout";
import { PieChart } from "src/components/piechart";
import { Input } from "src/components/Input";

// const Viewdata = (props: any) => {
//   return (
//     <div className="flex bg-gray-900 px-4">
//       <div className="w-1/2 p-1 text-white">項目: {props.data1}</div>
//       <div className="w-1/2 p-1 text-white">時間: {props.data2}</div>
//     </div>
//   );
// };

const Home = () => {
  // TODO colorを固定値管理
  const [timeTables, setTimeTables] = useState([
    { item: "React", time: 7, color: "bg-blue-600" },
    { item: "ブログ", time: 4, color: "bg-red-600" },
    { item: "睡眠", time: 8, color: "bg-green-600" },
    { item: "その他", time: 7, color: "bg-yellow-600" },
  ]);

  const onChangeItem = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newData = [...timeTables];
    newData[idx].item = e.target.value;
    setTimeTables(newData);
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newData = [...timeTables];
    newData[idx].time = Number(e.target.value);
    setTimeTables(newData);
  };

  //#region Hooks化

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
      // document.body.appendChild(canvas);
      const imgData = canvas.toDataURL("image/png");
      // const result = document.getElementById("result");
      // if (!result) {
      //   alert("nothing");
      //   return;
      // }
      // result.src = imgData;
      uploadFile(imgData);
      // console.log("done");
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
  //#endregion

  return (
    <Layout>
      <div>
        {/* コレスル！! コンポーネント化  */}
        <button className="p-2 bg-red-300" onClick={screenshot}>
          Screenshot
        </button>
        <button className="p-2 bg-blue-300" onClick={screenshot2}>
          Screenshot2
        </button>
        <div className="w-80 shadow-md m-auto my-10 ">
          <h1 className="bg-red-400 text-white text-2xl text-center p-3">コレスル</h1>
          <div id="capture">
            <PieChart timeTables={timeTables} />
          </div>
          {/* コレスル！！（map使って書いてみてください〜/Viewdataコンポーネントは使わない方向でおなしゃす🙏） */}
          {/* <Viewdata data1={data[0].item} data2={data[0].time} />
        <Viewdata data1={data[1].item} data2={data[1].time} />
        <Viewdata data1={data[2].item} data2={data[2].time} />
        <Viewdata data1={data[3].item} data2={data[3].time} /> */}

          {/* コレスル！！コード読み解きつつ模写してみてください〜💪 */}
          <div className="p-3 bg-gray-200">
            {timeTables.map((obj, idx) => (
              <div key={idx} className="flex justify-center w-72 m-auto">
                <span className={`w-12 h-12 text-white shadow p-2 rounded m-1 inline-block ${obj.color}`}></span>
                <Input
                  className="w-40 bg-red-200 shadow-inner rounded p-2 m-1 "
                  placeholder="項目を入れる"
                  value={obj.item}
                  onChange={(e) => onChangeItem(e, idx)}
                />
                <Input
                  className="w-10 bg-blue-200 shadow-inner rounded p-2 m-1 "
                  value={obj.time.toString()}
                  onChange={(e) => {
                    onChangeTime(e, idx);
                  }}
                />
                <div className="flex items-center">
                  <p className="text-xl">H</p>
                </div>
              </div>
            ))}
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
