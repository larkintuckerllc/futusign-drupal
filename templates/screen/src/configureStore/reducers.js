import { combineReducers } from 'redux';
import appBlocking from '../ducks/appBlocking';
import offlinePlaying from '../ducks/offlinePlaying';
import badPlaying from '../ducks/badPlaying';
import playlists from '../ducks/playlists';
import screen from '../ducks/screen';
import slideDecks from '../ducks/slideDecks';

export default combineReducers({
  appBlocking,
  offlinePlaying,
  badPlaying,
  playlists,
  screen,
  slideDecks,
});
