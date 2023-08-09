import {
  get,
  post,
} from '../api';

export const getPayments = () => {
  return get('/payments', {}, {});
};

export const createPayment = p => {
  return post('/payments', {}, p);
};
