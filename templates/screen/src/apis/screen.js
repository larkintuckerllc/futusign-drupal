import { SCREENS_API_ENDPOINT } from '../strings';
import * as fromRest from '../util/rest';

// eslint-disable-next-line
export const get = (id) => {
  return fromRest.get(`${window.baseRoot}${SCREENS_API_ENDPOINT}?id=${id.toString()}`)
    .then(response => ({
      id,
      // eslint-disable-next-line
      subscribedPlaylistIds: response[0].field_futusign_sc_su_playlists.map(o => Number(o.target_id)),
    }));
};
