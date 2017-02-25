import { PLAYLISTS_API_ENDPOINT } from '../strings';
import * as fromRest from '../util/rest';

// eslint-disable-next-line
export const get = () => {
  return fromRest.get(`${window.baseRoot}${PLAYLISTS_API_ENDPOINT}`)
    .then(response => (
      response.map(o => ({
        id: Number(o.tid[0].value),
        name: o.name[0].value,
      }))
    ));
};
