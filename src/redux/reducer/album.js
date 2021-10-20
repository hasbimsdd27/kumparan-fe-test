import { GET_ALL_ALBUM_AND_PHOTOS } from "../constans";

const initialState = {
  albums: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ALBUM_AND_PHOTOS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default reducer;
