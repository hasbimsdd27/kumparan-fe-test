import { GET_ALL_ALBUM_AND_PHOTOS } from "../constans";

export const getAllAlbumAndPost = (payload) => (dispatch) => {
  dispatch({
    type: GET_ALL_ALBUM_AND_PHOTOS,
    payload,
  });
};
