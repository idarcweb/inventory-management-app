import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SalesSummary } from "../../state/api";

interface ChartProps {
  data: SalesSummary[];
}

const Chart: React.FC<ChartProps> = ({ data, }) => {
return (
    <ResponsiveContainer width="100%" height={280} className="px-7">
      <BarChart
        data={data}
        margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="" vertical={false} />
        
         <XAxis
        dataKey="date"
        tickFormatter={(value) => {
          const date = new Date(value);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        }}
      />
        <YAxis
          tickFormatter={(value) => {
            return `$${(value / 1000000).toFixed(0)}m`;
          }}
          tick={{ fontSize: 12, dx: -1 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString("en")}`]}
          labelFormatter={(label) => {
            const date = new Date(label);
            return date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }}
        />
        <Bar
          dataKey="totalValue"
          fill="#3182ce"
          barSize={10}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
