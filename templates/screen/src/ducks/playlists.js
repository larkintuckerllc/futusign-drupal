import { combineReducers } from 'redux';
import { normalize, Schema, arrayOf } from 'normalizr';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';
import { ServerException } from '../util/exceptions';
// API
import { get } from '../apis/playlists';

// REDUCER MOUNT POINT
const reducerMountPoint = 'playlists';
// ACTIONS
export const FETCH_PLAYLISTS_REQUEST = `${ACTION_PREFIX}FETCH_PLAYLISTS_REQUEST`;
export const FETCH_PLAYLISTS_SUCCESS = `${ACTION_PREFIX}FETCH_PLAYLISTS_SUCCESS`;
export const FETCH_PLAYLISTS_ERROR = `${ACTION_PREFIX}FETCH_PLAYLISTS_ERROR`;
export const RESET_FETCH_PLAYLISTS_ERROR = `${ACTION_PREFIX}RESET_FETCH_PLAYLISTS_ERROR`;
export const RESET_PLAYLISTS = `${ACTION_PREFIX}RESET_PLAYLISTS`;
// SCHEMA
const playlistSchema = new Schema('playlists');
const playlistsSchema = arrayOf(playlistSchema);
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        ...action.response.entities.playlists,
      };
    }
    case RESET_PLAYLISTS: {
      return {};
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_SUCCESS:
      return action.response.result;
    case RESET_PLAYLISTS:
      return [];
    default:
      return state;
  }
};
const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_REQUEST:
      return true;
    case FETCH_PLAYLISTS_SUCCESS:
    case FETCH_PLAYLISTS_ERROR:
      return false;
    default:
      return state;
  }
};
const fetchErrorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_ERROR:
      return action.message;
    case FETCH_PLAYLISTS_REQUEST:
    case FETCH_PLAYLISTS_SUCCESS:
      return null;
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
  isFetching,
  fetchErrorMessage,
});
// ACCESSORS AKA SELECTORS
export const getPlaylist = (state, id) => state[reducerMountPoint].byId[id];
const getPlaylistsIds = state => state[reducerMountPoint].ids;
const getPlaylistsById = state => state[reducerMountPoint].byId;
export const getPlaylists = createSelector(
  [getPlaylistsIds, getPlaylistsById],
  (playlistsIds, playlistsById) => playlistsIds.map(id => playlistsById[id])
);
export const getIsFetchingPlaylists = (state) => state[reducerMountPoint].isFetching;
export const getFetchPlaylistsErrorMessage = (state) => state[reducerMountPoint].fetchErrorMessage;
// ACTION CREATOR VALIDATORS
// ACTION CREATORS
export const fetchPlaylists = () => (dispatch, getState) => {
  if (getIsFetchingPlaylists(getState())) throw new Error();
  dispatch({
    type: FETCH_PLAYLISTS_REQUEST,
  });
  return get()
    .then(
      response => dispatch({
        type: FETCH_PLAYLISTS_SUCCESS,
        response: normalize(response, playlistsSchema),
      }).response,
      error => {
        dispatch({
          type: FETCH_PLAYLISTS_ERROR,
          message: error.message,
        });
        throw new ServerException(error.message);
      }
    );
};
export const resetFetchPlaylistsError = () => ({
  type: RESET_FETCH_PLAYLISTS_ERROR,
});
export const resetPlaylists = () => ({
  type: RESET_PLAYLISTS,
});
