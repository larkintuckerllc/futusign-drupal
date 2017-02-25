import { SLIDE_DECKS_API_ENDPOINT } from '../strings';
import * as fromRest from '../util/rest';

// eslint-disable-next-line
export const get = (playlistNames) => {
  // eslint-disable-next-line
  return fromRest.get(`${window.baseRoot}${SLIDE_DECKS_API_ENDPOINT}?playlists=${playlistNames.join(',')}`)
    .then(response => (response.map(o => ({
      id: Number(o.nid[0].value),
      file: o.field_futusign_sd_file[0].url,
      slideDuration: Number(o.field_futusign_sd_slide_duration[0].value),
    }))));
};
