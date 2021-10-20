import { CREATE_COMMENT } from "../constans";

export const createComment = (payload) => (dispatch) => {
  dispatch({
    type: CREATE_COMMENT,
    payload,
  });
};
