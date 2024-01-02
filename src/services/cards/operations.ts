import { Dispatch } from 'redux';
import {
  getCards as APIgetCards,
  createCard as APIcreateCard,
  deleteCard as APIdeleteCard,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createCardRequest,
  createCardResponse,
  getCardsRequest,
  getCardsResponse,
  deleteCardRequest,
  deleteCardResponse,
  CardAction,
} from './actions';
import { Card } from './types';

type CardDispatch = Dispatch<CardAction>;

function fetchCards(filter = {}) {
  return fetchOnceOperation(
    getCardsRequest,
    getCardsResponse,
    APIgetCards,
    state => state.cards,
    [filter],
  );
}

function createCard(card: Card) {
  return (dispatch: CardDispatch) => {
    dispatch(createCardRequest({ card }));
    return APIcreateCard(card)
      .then(res => dispatch(createCardResponse({ ...res })));
  };
}

function deleteCard(cardId: string) {
  return (dispatch: CardDispatch) => {
    dispatch(deleteCardRequest({ cardId }));
    return APIdeleteCard(cardId)
      .then(res => dispatch(deleteCardResponse({ ...res })));
  };
}

const operations = {
  fetchCards,
  createCard,
  deleteCard,
};

export default operations;
