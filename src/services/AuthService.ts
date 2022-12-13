import axios from 'axios';
// import { UserInput } from 'src/interfaces/User';

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data: data,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
};
