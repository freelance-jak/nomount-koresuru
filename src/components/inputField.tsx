export const InputField = (props: any) => {
  return (
    <div className="flex justify-center w-72 m-auto">
      <span className={["w-12 h-12 text-white shadow p-2 rounded m-1 inline-block", props.color].join(" ")}></span>
      <input
        onChange={(event: any) => {
          const newData = [...props.data];
          newData[props.id] = { item: event.target.value, time: props.data[props.id].time };
          props.setData(newData);
        }}
        className="w-40 bg-gray-300 shadow-inner rounded p-2 m-1 "
        placeholder="項目を入れる"
      />
      <input
        onChange={(event: any) => {
          const newData = [...props.data];
          newData[props.id] = { item: props.data[props.id].item, time: Number(event.target.value) };
          props.setData(newData);
        }}
        className="w-10 bg-gray-300 shadow-inner rounded p-2 m-1 "
      />
      <div className="flex items-center">
        <p className="text-xl">H</p>
      </div>
    </div>
  );
};
