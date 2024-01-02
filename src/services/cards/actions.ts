import { Card } from './types';

export enum CardActionTypes {
  CREATE_CARD_REQUEST = 'CREATE_CARD_REQUEST',
  CREATE_CARD_RESPONSE = 'CREATE_CARD_RESPONSE',
  GET_CARDS_REQUEST = 'GET_CARDS_REQUEST',
  GET_CARDS_RESPONSE = 'GET_CARDS_RESPONSE',
  DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST',
  DELETE_CARD_RESPONSE = 'DELETE_CARD_RESPONSE',
}

export type CardAction =
  | { type: CardActionTypes.CREATE_CARD_REQUEST; payload: { card: Card } }
  | { type: CardActionTypes.CREATE_CARD_RESPONSE; payload: { card: Card } }
  | { type: CardActionTypes.GET_CARDS_REQUEST; payload: { cards: Card[] } }
  | { type: CardActionTypes.GET_CARDS_RESPONSE; payload: { cards: Card[] } }
  | { type: CardActionTypes.DELETE_CARD_REQUEST; payload: { cardId: string } }
  | { type: CardActionTypes.DELETE_CARD_RESPONSE; payload: { cardId: string } };

export const createCardRequest = (payload: { card: Card }): CardAction => ({
  type: CardActionTypes.CREATE_CARD_REQUEST,
  payload,
});

export const createCardResponse = (payload: { card: Card }): CardAction => ({
  type: CardActionTypes.CREATE_CARD_RESPONSE,
  payload,
});

export const getCardsRequest = (payload: { cards: Card[] }): CardAction => ({
  type: CardActionTypes.GET_CARDS_REQUEST,
  payload,
});

export const getCardsResponse = (payload: { cards: Card[] }): CardAction => ({
  type: CardActionTypes.GET_CARDS_RESPONSE,
  payload,
});

export const deleteCardRequest = (payload: { cardId: string }): CardAction => ({
  type: CardActionTypes.DELETE_CARD_REQUEST,
  payload,
});

export const deleteCardResponse = (payload: { cardId: string }): CardAction => ({
  type: CardActionTypes.DELETE_CARD_RESPONSE,
  payload,
});
