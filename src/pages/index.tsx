import { ChangeEvent, useState } from "react";

import { Input } from "src/components/Input";
import { Button } from "src/components/Button";
import { Layout } from "src/components/layout";
import { PieChart } from "src/components/piechart";

import { useFile } from "src/hooks/useFile";
import { TimeTable } from "src/types/types";
import { toCanvas, toBlob } from "src/utils/util";

const initialValue: TimeTable[] = [
  { item: "REACT", time: 7, color: "bg-red-500" },
  { item: "ブログ書く", time: 4, color: "bg-blue-500" },
  { item: "その他", time: 7, color: "bg-yellow-500" },
  { item: "睡眠", time: 8, color: "bg-green-500" },
];

const Home = () => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [timeTable, setTimeTable] = useState<TimeTable[]>(initialValue);
  // const [link, setLink] = useState("https://www.google.co.jp");
  const { upload } = useFile();

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

  const onClickShare = async () => {
    if (element === null) {
      alert(); // TODO
      return;
    }

    // TODO:ローディングアイコン表示

    const canvas = await toCanvas(element);
    const blob = await toBlob(canvas);
    const { imageId, error, imageURL } = await upload(blob);

    // setLink(imageURL);

    if (error) {
      // TODO: error handling
      alert("error");
      return;
    }

    alert(`アップロード成功：image id is ${imageId} with link \n ${imageURL}`);
  };

  return (
    <Layout>
      <div>
        <div className="w-80 shadow-md m-auto">
          <div
            ref={(element) => {
              return setElement(element);
            }}
          >
            <h1 className="bg-gray-500 text-white text-2xl text-center p-2">コレスル</h1>
            {/* <PieChart timeTables={timeTable} setElement={setElement} /> */}
            <div className="bg-gray-100 pb-2">
              <PieChart timeTables={timeTable} />
            </div>
          </div>

          {/* {timeTable.map((obj, idx) => {
            return (
              <div key={idx} className="flex bg-gray-900 px-4">
                <div className="w-1/2 p-1 text-white">項目: {obj.item}</div>
                <div className="w-1/2 p-1 text-white">時間: {obj.time}</div>
              </div>
            );
          })} */}

          <div className="p-3 bg-gray-100">
            {timeTable.map((obj, idx) => {
              return (
                <div key={idx} className="flex justify-center w-72 m-auto">
                  <span className={`w-12 h-12 text-white shadow p-2 rounded m-1 inline-block ${obj.color}`}></span>
                  <Input
                    onChange={(e) => {
                      onChangeItem(e, idx);
                    }}
                    value={obj.item}
                    className="w-40 bg-gray-200 shadow-inner rounded p-2 m-1 "
                    placeholder="項目を入れる"
                  />
                  <Input
                    value={obj.time.toString()}
                    onChange={(e) => {
                      onChangeTime(e, idx);
                    }}
                    className="w-10 bg-gray-200 shadow-inner rounded p-2 m-1 "
                  />
                  <div className="flex items-center">
                    <p className="text-xl">H</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pb-5 px-5 text-center">
            <Button className="w-full rounded p-3 bg-blue-700 text-white" onClick={onClickShare}>
              シェア
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
