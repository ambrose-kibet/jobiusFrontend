import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponet = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={500} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 13" />
        <XAxis dataKey="date" />
        <Bar dataKey="count" fill="#1a147c" barSize={75} />
        <YAxis allowDecimals={false} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponet;
