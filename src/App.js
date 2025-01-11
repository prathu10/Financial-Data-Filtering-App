import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from './apiService';
import FinancialTable from './components/FinancialTable';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    revenueMin: '',
    revenueMax: '',
    netIncomeMin: '',
    netIncomeMax: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFinancialData();
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const date = new Date(item.date).getFullYear();
      return (
        (!filters.startDate || date >= filters.startDate) &&
        (!filters.endDate || date <= filters.endDate) &&
        (!filters.revenueMin || item.revenue >= filters.revenueMin) &&
        (!filters.revenueMax || item.revenue <= filters.revenueMax) &&
        (!filters.netIncomeMin || item.netIncome >= filters.netIncomeMin) &&
        (!filters.netIncomeMax || item.netIncome <= filters.netIncomeMax)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-blue-700">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-10 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight">📊 Financial Dashboard</h1>
        <p className="text-md md:text-lg mt-2">Filter, analyze, and explore key financial metrics</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Filter Section */}
        <section className="bg-white bg-opacity-70 shadow-xl rounded-lg p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Filters</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Start Date', name: 'startDate', value: filters.startDate },
              { label: 'End Date', name: 'endDate', value: filters.endDate },
              { label: 'Revenue Min', name: 'revenueMin', value: filters.revenueMin },
              { label: 'Revenue Max', name: 'revenueMax', value: filters.revenueMax },
              { label: 'Net Income Min', name: 'netIncomeMin', value: filters.netIncomeMin },
              { label: 'Net Income Max', name: 'netIncomeMax', value: filters.netIncomeMax },
            ].map((filter) => (
              <div key={filter.name}>
                <label className="block text-sm font-medium text-gray-600 mb-2">{filter.label}</label>
                <input
                  type="number"
                  name={filter.name}
                  value={filter.value}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
                />
              </div>
            ))}
          </div>
          <button
            onClick={applyFilters}
            className="mt-8 w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition duration-200"
          >
            Apply Filters
          </button>
        </section>

        {/* Sorting Section */}
        <section className="bg-white bg-opacity-70 shadow-xl rounded-lg p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Sorting Options</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Date Ascending', key: 'date', order: 'asc' },
              { label: 'Date Descending', key: 'date', order: 'desc' },
              { label: 'Revenue Ascending', key: 'revenue', order: 'asc' },
              { label: 'Revenue Descending', key: 'revenue', order: 'desc' },
              { label: 'Net Income Ascending', key: 'netIncome', order: 'asc' },
              { label: 'Net Income Descending', key: 'netIncome', order: 'desc' },
            ].map((sort) => (
              <button
                key={sort.label}
                onClick={() => {
                  const sorted = [...filteredData].sort((a, b) => {
                    const valA = sort.key === 'date' ? new Date(a[sort.key]) : a[sort.key];
                    const valB = sort.key === 'date' ? new Date(b[sort.key]) : b[sort.key];
                    return sort.order === 'asc' ? valA - valB : valB - valA;
                  });
                  setFilteredData(sorted);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200"
              >
                {sort.label}
              </button>
            ))}
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-white bg-opacity-70 shadow-xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💼 Financial Data</h2>
          <FinancialTable data={filteredData} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center py-6 mt-10">
        <p className="text-sm">© 2025 Financial Dashboard. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
