import { CardAction, CardActionTypes } from './actions';
import { Card } from './types';

export default function reducer (state: Card[] | null = null, action: CardAction) {
  switch (action.type) {
    case CardActionTypes.GET_CARDS_RESPONSE:
      return action.payload.cards;
    case CardActionTypes.CREATE_CARD_RESPONSE:
      return (state || []).concat(action.payload.card);
    case CardActionTypes.DELETE_CARD_RESPONSE:
      return state?.filter(card => card.id !== action.payload.cardId);
    default:
      return state;
  }
}
