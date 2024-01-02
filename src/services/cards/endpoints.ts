import {
  get,
  post,
  del,
} from '../api';

export const getCards = filter => {
  return get('/users/me/cards', {}, { filter });
};

export const createCard = card => {
  return post('/users/me/cards', {}, card);
};

export const deleteCard = id => {
  return del('/users/me/cards/:id', { id });
};
