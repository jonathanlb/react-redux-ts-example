import { ActionType } from 'typesafe-actions';

import * as messageActions from './actions';
import { DELETE_MSG, SUBMIT_MSG } from './constants';
export type MessageAction = ActionType<typeof messageActions>;

export type MessagesState = {
  messages: string[];
};

const initialState: MessagesState = {
  messages: []
};

const MAX_NUM_OLD_MSGS = 4;

export default (state: MessagesState = initialState, action: MessageAction) => {
  switch (action && action.type) {
    case DELETE_MSG: {
      const messages = state.messages.slice();
      messages.splice(action.payload as number, 1);
      return { ...state, messages };
    }
    case SUBMIT_MSG: {
      const messages = state.messages.slice(0, MAX_NUM_OLD_MSGS);
      messages.unshift(action.payload as string);
      return { ...state, messages };
    }
    default:
      return state;
  }
}
