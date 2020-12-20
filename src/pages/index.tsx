import { useState } from "react";
import { divCapture, divUpload } from "src/components/divCapture";
import { InputField } from "src/components/inputField";
import { Layout } from "src/components/layout";
import { PieChart } from "src/components/piechart";

const App = () => {
  const [data, setData] = useState([
    { item: "REACT", time: 7 },
    { item: "ブログ", time: 4 },
    { item: "その他", time: 7 },
    { item: "睡眠", time: 8 },
  ]);

  return (
    <div>
      <button
        className="p-2 bg-red-300"
        onClick={() => {
          return divCapture("capture", "showCapture");
        }}
      >
        Capture SVG
      </button>
      <button
        className="p-2 bg-blue-300"
        onClick={() => {
          return divUpload("capture", "showCapture", "share");
        }}
      >
        Capture and Upload
      </button>
      <div className="w-80 shadow-md m-auto my-10 bg-gray-200">
        <h1 className="bg-red-400 text-white text-2xl text-center p-3">コレスル</h1>
        <div id="capture">
          <h1 className="mt-5 text-xl p-3 text-center bg-blue-200">今日のコレスル</h1>
          <PieChart timeTables={data} />
        </div>

        <div className="p-3 bg-gray-200">
          <InputField id="0" data={data} setData={setData} color="bg-red-400" />
          <InputField id="1" data={data} setData={setData} color="bg-blue-700" />
          <InputField id="2" data={data} setData={setData} color="bg-green-600" />
          <InputField id="3" data={data} setData={setData} color="bg-gray-400" />

          <div className="flex justify-center p-3">
            <a
              className="p-2 bg-red-400 block rounded shadow w-1/2 text-center"
              id="share"
              href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw"
            >
              Share
            </a>
          </div>
        </div>
      </div>
      <div className="w-80 m-auto">
        <p>Result image</p>
        <img alt="outimage" id="showCapture" src="" width="300px" height="300px" />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <Layout>
      <App />
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
