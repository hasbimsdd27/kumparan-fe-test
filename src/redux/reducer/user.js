import { GET_ALL_USER } from "../constans";

const initialState = {
  users: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
