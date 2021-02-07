import type { Dispatch, SetStateAction } from "react";
import { Cell, Pie, PieChart as RechartPieChart, Surface, Symbols } from "recharts";

import { TimeTable } from "src/types/types";

type Props = {
  timeTables: TimeTable[];
  setElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
};

export const PieChart = (props: Props) => {
  const { timeTables, setElement } = props;
  {
    /* TODO: 分割したい */
  }
  const COLORS = ["#DA7671", "#4267B2", "#77B255", "#9E9E9E"];

  const chartSize = 150;

  return (
    <div
      ref={(element) => {
        return setElement(element);
      }}
      className="flex items-center"
    >
      <RechartPieChart width={chartSize} height={chartSize}>
        <Pie
          data={timeTables}
          dataKey="time"
          cx={chartSize / 2}
          cy={chartSize / 2}
          startAngle={90}
          endAngle={-270}
          innerRadius={chartSize * 0.3}
          outerRadius={chartSize * 0.4}
          fill="#8884d8"
        >
          {timeTables.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
          })}
        </Pie>
      </RechartPieChart>
      {/* TODO: 分割したい */}
      <div className="legend-item w-64">
        {timeTables.map((entry, index) => {
          return (
            <>
              <div className="flex-wrap">
                <div className="flex items-baseline">
                  {/* TODO: 分割したい */}
                  <Surface className="mr-2" width={20} height={20}>
                    <Symbols cx={14} cy={14} type="circle" size={100} fill={COLORS[index]} />
                  </Surface>
                  <div className="w-24 truncate">{entry.item}</div>
                  <div className="flex items-center">
                    <span className="w-8 text-right align-bottom text-xs text-gray-500	">{entry.time}H</span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
// eslint-disable-next-line import/no-default-export
