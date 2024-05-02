import { combineReducers } from 'redux';
import jobsReducer from './jobsSlice';

const rootReducer = combineReducers({
  jobs: jobsReducer,
});

export default rootReducer;