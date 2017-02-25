import { SLIDE_DECKS_API_ENDPOINT } from '../strings';
import * as fromRest from '../util/rest';

// eslint-disable-next-line
export const get = (playlistIds) => {
  return fromRest.get(`${window.baseRoot}${SLIDE_DECKS_API_ENDPOINT}`)
    .then(response => (response.map(o => ({
      id: o.id,
      file: o.acf.file,
      slideDuration: Number(o.acf.slide_duration),
    }))));
};
