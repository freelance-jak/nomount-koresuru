// import { CloudinaryContext } from "cloudinary-react";
// import { Image } from "cloudinary-react";
// import { ESTALE } from "constants";
import html2canvas from "html2canvas";
import { useState } from "react";
import Chart from "react-google-charts";
import { Layout } from "src/components/layout";

// (window as any).html2canvas = html2canvas;

const InputField = (props: any) => {
  return (
    <div className="flex justify-center w-72 m-auto">
      <span className={["w-12 h-12 text-white shadow p-2 rounded m-1 inline-block", props.color].join(" ")}></span>
      <input
        onChange={() => {
          const newData = [...props.data];
          newData[props.id] = { item: event.target.value, time: props.data[props.id].time };
          props.setData(newData);
        }}
        className="w-40 bg-red-200 shadow-inner rounded p-2 m-1 "
        placeholder="項目を入れる"
      />
      <input
        onChange={() => {
          const newData = [...props.data];
          newData[props.id] = { item: props.data[props.id].item, time: event.target.value };
          props.setData(newData);
        }}
        className="w-10 bg-blue-200 shadow-inner rounded p-2 m-1 "
      />
      <div className="flex items-center">
        <p className="text-xl">H</p>
      </div>
    </div>
  );
};

const Viewdata = (props: any) => {
  return (
    <div className="flex bg-gray-900 px-4">
      <div className="w-1/2 p-1 text-white">項目: {props.data1}</div>
      <div className="w-1/2 p-1 text-white">時間: {props.data2}</div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([
    // { item: "", time: "" },
    // { item: "", time: "" },
    // { item: "", time: "" },
    // { item: "", time: "" },
    { item: "REACT", time: "7" },
    { item: "ブログ書く", time: "4" },
    { item: "その他", time: "7" },
    { item: "睡眠", time: "8" },
  ]);

  const screenshot = () => {
    const target = document.getElementById("capture");
    if (!target) {
      alert("nothing");
      return;
    }
    html2canvas(target).then((canvas) => {
      // document.body.appendChild(canvas);
      const imgData = canvas.toDataURL("image/png");
      const result = document.getElementById("result");
      if (!result) {
        alert("nothing");
        return;
      }
      result.src = imgData;
      // console.log("done");
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
        result.src = url;
        const share = document.getElementById("share");
        if (!share) {
          alert("nothing");
          return;
        }
        // https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Ftoretama.jp%2Fsns-twitter-share.html&ref_src=twsrc%5Etfw&text=Twitter%20で「シェア（共有）」してもらうボタンを設置する方法&tw_p=tweetbutton&url=http%3A%2F%2Ftoretama.jp%2Fsns-twitter-share.html
        // <a href="http://twitter.com/share?url=[シェアするURL]&text=[ツイート内テキスト]&via=[ツイート内に含むユーザ名]&related=[ツイート後に表示されるユーザー]&hashtags=[ハッシュタグ]" target="_blank">ツイート</a>
        share.href = `http://twitter.com/share?url=${url}&text=今日のコレスル&hashtags=コレスル`;
        // gallery.appendChild(img);
      }
    };

    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", file);
    xhr.send(fd);
  };

  return (
    <div>
      <button onClick={screenshot}>Screenshot</button>
      <button onClick={screenshot2}>Screenshot2</button>
      <div className="w-80 shadow-md m-auto my-10 ">
        <h1 className="bg-red-400 text-white text-2xl text-center p-3">コレスル</h1>
        <div id="capture">
          <Chart
            width={"320px"}
            height={"250px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Task", "Hours per Day"],
              ["REACT", 11],
              ["ブログ", 2],
              ["その他", 3],
              ["睡眠", 7],
            ]}
            options={{
              // title: "My Daily Activities",
              chartArea: { top: "0", left: "5%", width: "90%", height: "100%" },
              pieHole: 0.6,
              legend: {
                position: "right",
                alignment: "center",
                textStyle: { color: "black", fontSize: "16" },
              },
              pieSliceText: "none",
              pieStartAngle: "0",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
        <Viewdata data1={data[0].item} data2={data[0].time} />
        <Viewdata data1={data[1].item} data2={data[1].time} />
        <Viewdata data1={data[2].item} data2={data[2].time} />
        <Viewdata data1={data[3].item} data2={data[3].time} />

        <div className="p-3 bg-gray-200">
          <InputField id="0" data={data} setData={setData} color="bg-blue-600" />
          <InputField id="1" data={data} setData={setData} color="bg-red-600" />
          <InputField id="2" data={data} setData={setData} color="bg-yellow-600" />
          <InputField id="3" data={data} setData={setData} color="bg-green-600" />
        </div>

        {/* <div id="share"></div> */}
        <a id="share" href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">
          Share
        </a>
      </div>

      <div className="w-80 m-auto">
        <p>Result image</p>
        <div id="gallery" />
        <img alt="outimage" id="result" src="" width="300px" height="300px" />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <Layout>
      {/* <button
        className="btn-blue"
        onClick={() => {
          window.alert("Hello, World!");
        }}
      >
        Button
      </button> */}
      <App />
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
