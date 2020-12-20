import { Layout } from "src/components/layout";
import { PieChart } from "src/components/piechart";

const Home = () => {
  const data = [
    { item: "React", time: 2 },
    { item: "Blog構築", time: 2 },
    { item: "睡眠", time: 6 },
    { item: "その他", time: 8 },
  ];
  return (
    <Layout>
      <button
        className="btn-blue"
        onClick={() => {
          window.alert("Hello, World!");
        }}
      >
        Button
      </button>
      <PieChart timeTables={data} />
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
