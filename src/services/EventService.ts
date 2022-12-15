import axios from 'axios';

export const createEvent = (data) => {
  return axios({
    method: 'post',
    url: '/events',
    data: data
  });
};

export const updateEvent = (data, id) => {
  return axios({
    method: 'put',
    url: `/events/${id}`,
    data: data
  });
};

export const deleteEvent = (id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'delete',
    url: `/events/${id}`
  });
};
