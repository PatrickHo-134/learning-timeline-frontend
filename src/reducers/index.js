import { combineReducers } from 'redux';
import learningNoteReducer from './learningNoteReducer';
import { userRegisterReducer, userLoginReducer } from './userReducer';
import { labelListReducer } from './labelReducer';
import { collectionListReducer } from './collectionReducer';
import { pageFilterReducer } from './pageFilterReducer';
import { LOGOUT } from '../actions/userActions';

const appReducer = combineReducers({
  learningNotes: learningNoteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  labelList: labelListReducer,
  collectionList: collectionListReducer,
  pageFilter: pageFilterReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
}
export default rootReducer;
