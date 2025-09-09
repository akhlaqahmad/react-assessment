import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const SalesLineChart = () => {
    const data = useSelector((state: any) => state.chart.lineChartData);
    
    return (
      <div className="w-full h-full" style={{ minHeight: '200px', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
