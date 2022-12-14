import axios from 'axios';

export const createEvent = (data) => {
  return axios({
    method: 'post',
    url: '/events',
    data: data
  });
};

export const updateBlog = (data, id) => {
  return axios({
    method: 'put',
    url: `/news/articles/${id}`,
    data: data
  });
};

export const deleteBlog = (id) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  return axios({
    method: 'delete',
    url: `/news/articles/${id}`
  });
};
