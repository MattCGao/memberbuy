/* @flow */
import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------

/**
 * Declare constant for action
 * @type {string}
 */
export const FETCH_USERS_DATA_START = 'FETCH_USERS_DATA_START'
export const FETCH_USERS_DATA_DONE = 'FETCH_USERS_DATA_DONE'

const USERS_API = 'https://s3-ap-southeast-2.amazonaws.com/memberbuy-static-content/interview.json';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * fetch all users data.
 */

/**
 * Function is action with name is fetchUsersDataStart
 * @returns {{type: string}}
 */
export function fetchUsersDataStart() {
  return {
    type: FETCH_USERS_DATA_START,
  }
}

/**
 * Function is action with name is fetchUsersDataDone
 * @param list
 * @param msg
 * @param success
 * @returns {{type: string, list: *, msg: *, success: *}}
 */
export function fetchUsersDataDone(list, msg, success) {
  return {
    type: FETCH_USERS_DATA_DONE,
    list: list,
    msg: msg,
    success: success
  }
}

/**
 * Function fetchUsersData
 * Use to fetch all users data
 * @param 
 * @returns {function(*, *)}
 */
export function fetchUsersData() {
  return (dispatch, getState) => {
    dispatch(fetchUsersDataStart());
    fetch(USERS_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response=>{
      return response.json()
    }).then(json=>{
      dispatch(fetchUsersDataDone(json, 'Fetch notification successfully.', true))
    });
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const NOTIFICATION_ACTION_HANDLERS = {
  [FETCH_USERS_DATA_START]: (state, action) => {
    return ({...state, fetching: true, systemMessage:'', usersList: []})
  },
  [FETCH_USERS_DATA_DONE]: (state, action) => {
    return ({...state, usersList: action.list, systemMessage: action.msg, fetching: false})
  }

}

// ------------------------------------
// Reducers
// ------------------------------------

/**
 * Declare state initialState
 * @type {{fetching: boolean, notificationList: Array, systemMessage: string}}
 */
const initialState = {
  fetching: false,
  usersList: [],
  systemMessage: '',
}

/**
 * Function is reducer with name is notificationReducer
 * @param state
 * @param action
 * @returns {{fetching: boolean, notificationList: Array, systemMessage: string}}
 */
export default function notificationReducer (state=initialState, action) {
  const handler = NOTIFICATION_ACTION_HANDLERS[action.type];

  return (handler ? handler(state, action) : state);
}

