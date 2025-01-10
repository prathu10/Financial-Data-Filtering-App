import axios from 'axios';

const API_KEY = 'G6xgskPu2UegHy7NPXnKD23Ro7WMay5K';
const BASE_URL = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`;

export const fetchFinancialData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
