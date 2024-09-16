import { combineReducers } from 'redux';
import learningNoteReducer from './learningNoteReducer';
import { userRegisterReducer, userLoginReducer } from './userReducer';
import { labelListReducer } from './labelReducer';
import { collectionListReducer } from './collectionReducer';

const rootReducer = combineReducers({
  learningNotes: learningNoteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  labelList: labelListReducer,
  collectionList: collectionListReducer,
});

export default rootReducer;
