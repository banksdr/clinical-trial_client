import {combineReducers} from 'redux';
import TrialsReducer from './reducer-trials';
import SearchReducer from './reducer-search';
import SelectReducer from './reducer-select';

const allReducers = combineReducers({
  trials: TrialsReducer,
  search: SearchReducer,
  select: SelectReducer
});

export default allReducers;
