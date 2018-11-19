"use strict";

import _ from 'lodash';

export default function Selection(state = [], action) {
  switch (action.type) {
    case 'SELECT_TRIAL':
      return Object.assign([], [
        ...state,
        action.payload
      ]);
      break;
    case 'REMOVE_TRIAL':
      var newState = state.filter((trial) => { return trial.id !== action.id });
      return Object.assign([], ...state, newState);
      break;
  }
  return state;
}
