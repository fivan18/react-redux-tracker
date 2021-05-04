import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: '2021-05-01',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2021-05-02',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '2021-05-03',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '2021-05-04',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '2021-05-05',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '2021-05-06',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '2021-05-07',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '2021-05-08',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '2021-05-09',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Progress = () => (
  <div>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  </div>
);

export default Progress;
