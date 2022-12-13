import axios from 'axios';

// Get data form server
export const getData = async <T>(url: string): Promise<T> => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');
  const res = await axios.get<T>(url, { headers: { Authorization: token } });
  return res.data;
};

export const multiFetcher = async (...urlArr: string[]) =>
  Promise.allSettled(urlArr.map((url) => getData(url)));
