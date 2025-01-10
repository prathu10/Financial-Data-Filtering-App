import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from './apiService'; // Ensure this file exists and fetches the API data
import FinancialTable from './components/FinancialTable'; // Ensure the table component exists

const App = () => {
  const [data, setData] = useState([]); // Raw data from the API
  const [filteredData, setFilteredData] = useState([]); // Data after applying filters and sorting
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    revenueMin: '',
    revenueMax: '',
    netIncomeMin: '',
    netIncomeMax: '',
  });

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      const result = await fetchFinancialData();
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  // Update filter values based on user input
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters to the data
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

  // Sorting functionality
  const sortData = (key, order = 'asc') => {
    const sorted = [...filteredData].sort((a, b) => {
      const valA = key === 'date' ? new Date(a[key]) : a[key];
      const valB = key === 'date' ? new Date(b[key]) : b[key];
      return order === 'asc' ? valA - valB : valB - valA;
    });
    setFilteredData(sorted);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Financial Data Filtering App</h1>

      {/* Filter Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="number"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="number"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Revenue Min</label>
          <input
            type="number"
            name="revenueMin"
            value={filters.revenueMin}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Revenue Max</label>
          <input
            type="number"
            name="revenueMax"
            value={filters.revenueMax}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Net Income Min</label>
          <input
            type="number"
            name="netIncomeMin"
            value={filters.netIncomeMin}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Net Income Max</label>
          <input
            type="number"
            name="netIncomeMax"
            value={filters.netIncomeMax}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Apply Filters
      </button>

      {/* Sorting Buttons */}
      <div className="flex justify-start space-x-4 mb-4">
        <button
          onClick={() => sortData('date', 'asc')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Sort by Date (Asc)
        </button>
        <button
          onClick={() => sortData('date', 'desc')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Sort by Date (Desc)
        </button>
        <button
          onClick={() => sortData('revenue', 'asc')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Sort by Revenue (Asc)
        </button>
        <button
          onClick={() => sortData('revenue', 'desc')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Sort by Revenue (Desc)
        </button>
        <button
          onClick={() => sortData('netIncome', 'asc')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Sort by Net Income (Asc)
        </button>
        <button
          onClick={() => sortData('netIncome', 'desc')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Sort by Net Income (Desc)
        </button>
      </div>

      {/* Data Table */}
      <FinancialTable data={filteredData} />
    </div>
  );
};

export default App;
