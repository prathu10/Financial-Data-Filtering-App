import React from 'react';

const FinancialTable = ({ data }) => (
  <table className="table-auto border-collapse border border-gray-200 w-full">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">Date</th>
        <th className="border px-4 py-2">Revenue</th>
        <th className="border px-4 py-2">Net Income</th>
        <th className="border px-4 py-2">Gross Profit</th>
        <th className="border px-4 py-2">EPS</th>
        <th className="border px-4 py-2">Operating Income</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{item.date}</td>
          <td className="border px-4 py-2">{item.revenue}</td>
          <td className="border px-4 py-2">{item.netIncome}</td>
          <td className="border px-4 py-2">{item.grossProfit}</td>
          <td className="border px-4 py-2">{item.eps}</td>
          <td className="border px-4 py-2">{item.operatingIncome}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default FinancialTable;
