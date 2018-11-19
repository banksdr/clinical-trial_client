"use strict";

export default function Trials(state = [], action) {
  switch (action.type) {
    case 'GET_TRIALS':
      return action.payload;
      break;
  }
  return state;
}
