import { Cell, Pie, PieChart as RechartPieChart, Surface, Symbols } from "recharts";

export const PieChart = (props: any) => {
  const timeTables: { item: string; time: number }[] = props.timeTables;
  {
    /* TODO: 分割したい */
  }
  const COLORS = ["#DA7671", "#4267B2", "#77B255", "#9E9E9E"];

  return (
    <div className="flex items-center">
      <RechartPieChart width={200} height={200}>
        <Pie
          data={timeTables}
          dataKey="time"
          cx={100}
          cy={100}
          startAngle={90}
          endAngle={-270}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
        >
          {timeTables.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
          })}
        </Pie>
      </RechartPieChart>
      {/* TODO: 分割したい */}
      <span className="legend-item">
        {timeTables.map((entry, index) => {
          return (
            <>
              <div className="flex">
                {/* TODO: 分割したい */}
                <Surface className="mr-2" width={20} height={20}>
                  <Symbols className="ml-4" cx={13} cy={13} type="circle" size={100} fill={COLORS[index]} />
                </Surface>
                <span>{entry.item}</span>
                <div className="flex items-end">
                  <span className="align-bottom ml-2 text-xs text-gray-500	">{entry.time}</span>
                </div>
              </div>
            </>
          );
        })}
      </span>
    </div>
  );
};
// eslint-disable-next-line import/no-default-export
