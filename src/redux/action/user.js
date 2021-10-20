import { GET_ALL_USER } from "../constans";

export const getAllUser = (payload) => (dispatch) => {
  dispatch({
    type: GET_ALL_USER,
    payload,
  });
};
