import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/user';
import { setAuthorization, setUserInfo } from './Action'

export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}

const actions = { setAuthorization, setUserInfo };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    default:
      return state;
  }
}
