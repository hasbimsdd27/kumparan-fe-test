import {
  GET_ALL_POSTS_AND_COMMENTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../constans";

export const getAllPostAndComment = (payload) => (dispatch) => {
  dispatch({
    type: GET_ALL_POSTS_AND_COMMENTS,
    payload,
  });
};

export const createPost = (payload) => (dispatch) => {
  dispatch({
    type: CREATE_POST,
    payload,
  });
};

export const updatePost = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_POST,
    payload,
  });
};

export const deletePost = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_POST,
    payload,
  });
};
