"use strict";

export default function Search(state = [], action) {
  switch (action.type) {
    case 'GET_QUERY':
      return action.payload;
      break;
  }
  return state;
}
