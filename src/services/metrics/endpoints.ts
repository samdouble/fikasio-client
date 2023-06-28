import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getMetrics = filter => {
  return get(`/metrics`, {}, { filter });
};

export const createMetric = metric => {
  return post(`/metrics`, {}, metric);
};

export const updateMetric = (id, metric) => {
  return put(`/metrics/:id`, { id }, metric);
};

export const patchMetric = (id, metric) => {
  return patch(`/metrics/:id`, { id }, metric);
};

export const deleteMetric = id => {
  return del(`/metrics/:id`, { id });
};
