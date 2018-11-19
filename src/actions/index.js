"use strict";

import axios from 'axios';

function tupleToUriComponent(tuple) {
  return tuple.map(encodeURIComponent)
              .join('=');
}

function objectToQuery(items) {
  var queryString = _.toPairs(items)
                    .map(tupleToUriComponent)
                    .join('&');
  return queryString.length > 0
      ? ('?' + queryString)
      : queryString;
}

export function trialsResponse(trialsData) {
  return {
    type: 'GET_TRIALS',
    payload: trialsData
  }
}

export function getAllTrials(query) {
  let queryBuilder = objectToQuery(query);
  return function (dispatch) {
    return axios.get(`https://api.opentrials.net/v1/search${queryBuilder}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(trialsResponse(response.data.items));
        }
      })
      .catch((error) => {
        console.error('trials action error', error);
      });
  }
}

export function querySearch(data) {
  return {
    type: 'GET_QUERY',
    payload: data
  }
}

export function selectTrial(input) {
  return {
    type: 'SELECT_TRIAL',
    payload: input
  }
}

export function removeTrial(id) {
  return {
    type: 'REMOVE_TRIAL',
    id: id
  }
}
