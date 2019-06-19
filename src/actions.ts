import { action } from 'typesafe-actions';

import { DELETE_MSG, SUBMIT_MSG } from './constants';

export const deleteMessage = (idx: number) => action(DELETE_MSG, idx);
export const submitMessage = (msg: string) => action(SUBMIT_MSG, msg);
