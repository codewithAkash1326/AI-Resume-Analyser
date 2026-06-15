import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function TrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="analysisNumber" />

        <YAxis />

        <Tooltip />

        <Line type="monotone" dataKey="atsScore" />

        <Line type="monotone" dataKey="keywordMatch" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default TrendChart;
