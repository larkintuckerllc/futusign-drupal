import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { POLLING_INTERVAL } from '../../strings';
import * as fromAppBlocking from '../../ducks/appBlocking';
import * as fromScreen from '../../ducks/screen';
import * as fromSlideDecks from '../../ducks/slideDecks';
import * as fromOfflinePlaying from '../../ducks/offlinePlaying';
import * as fromBadPlaying from '../../ducks/badPlaying';
import Blocking from './Blocking';
import Offline from './Offline';
import Bad from './Bad';
import NoSlideDecks from './NoSlideDecks';
import SlideShow from './SlideShow';

class App extends Component {
  componentDidMount() {
    const {
      fetchScreen,
      setAppBlocking,
      setBadPlaying,
      setOfflinePlaying,
    } = this.props;
    const fetch = () => {
      fetchScreen()
      .catch(error => {
        setOfflinePlaying(true);
        setBadPlaying(false);
        setAppBlocking(false);
        if (process.env.NODE_ENV !== 'production'
          && error.name !== 'ServerException') {
          window.console.log(error);
          return;
        }
      });
    };
    fetch();
    /*
    const {
      fetchScreen,
      fetchSlideDecks,
      resetSlideDecks,
      setAppBlocking,
      setBadPlaying,
      setOfflinePlaying,
    } = this.props;
    const fetch = () => {
      fetchScreen()
      .then(screen => {
        if (screen.subscribedPlaylistIds.length === 0) {
          resetSlideDecks();
          return Promise.resolve();
        }
        return fetchSlideDecks(screen.subscribedPlaylistIds);
      })
      .then(() => {
        setOfflinePlaying(false);
        setBadPlaying(false);
        setAppBlocking(false);
      })
      .catch(error => {
        setOfflinePlaying(true);
        setBadPlaying(false);
        setAppBlocking(false);
        if (process.env.NODE_ENV !== 'production'
          && error.name !== 'ServerException') {
          window.console.log(error);
          return;
        }
      });
    };
    fetch();
    window.setInterval(fetch, POLLING_INTERVAL * 1000);
    */
  }
  render() {
    const {
      appBlocking,
      badPlaying,
      offlinePlaying,
      slideDecks,
    } = this.props;
    if (appBlocking) return <Blocking />;
    if (offlinePlaying) return <Offline />;
    if (badPlaying) return <Bad />;
    if (slideDecks.length === 0) return <NoSlideDecks />;
    return (
      <SlideShow
        slideDecks={slideDecks.map(o => ({
          id: o.file,
          file: o.file,
          slideDuration: o.slideDuration,
        }))}
      />
    );
  }
}
App.propTypes = {
  appBlocking: PropTypes.bool.isRequired,
  badPlaying: PropTypes.bool.isRequired,
  fetchScreen: PropTypes.func.isRequired,
  fetchSlideDecks: PropTypes.func.isRequired,
  offlinePlaying: PropTypes.bool.isRequired,
  resetSlideDecks: PropTypes.func.isRequired,
  setAppBlocking: PropTypes.func.isRequired,
  setBadPlaying: PropTypes.func.isRequired,
  setOfflinePlaying: PropTypes.func.isRequired,
  slideDecks: PropTypes.array.isRequired,
};
export default connect(
  state => ({
    appBlocking: fromAppBlocking.getAppBlocking(state),
    badPlaying: fromBadPlaying.getBadPlaying(state),
    offlinePlaying: fromOfflinePlaying.getOfflinePlaying(state),
    slideDecks: fromSlideDecks.getSlideDecks(state),
  }),
  {
    fetchScreen: fromScreen.fetchScreen,
    fetchSlideDecks: fromSlideDecks.fetchSlideDecks,
    resetSlideDecks: fromSlideDecks.resetSlideDecks,
    setAppBlocking: fromAppBlocking.setAppBlocking,
    setBadPlaying: fromBadPlaying.setBadPlaying,
    setOfflinePlaying: fromOfflinePlaying.setOfflinePlaying,
  }
)(App);