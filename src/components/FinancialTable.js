import React from 'react';

const FinancialTable = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="table-auto border-collapse border border-gray-200 w-full text-sm">
      <thead>
        <tr className="bg-gradient-to-r from-blue-100 to-indigo-200 text-gray-700">
          {['Date', 'Revenue', 'Net Income', 'Gross Profit', 'EPS', 'Operating Income'].map((header) => (
            <th key={header} className="border px-4 py-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300">
            <td className="border px-4 py-2">{item.date}</td>
            <td className="border px-4 py-2">${item.revenue?.toLocaleString()}</td>
            <td className="border px-4 py-2">${item.netIncome?.toLocaleString()}</td>
            <td className="border px-4 py-2">${item.grossProfit?.toLocaleString()}</td>
            <td className="border px-4 py-2">{item.eps}</td>
            <td className="border px-4 py-2">${item.operatingIncome?.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FinancialTable;
