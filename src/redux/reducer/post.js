import {
  GET_ALL_POSTS_AND_COMMENTS,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  CREATE_COMMENT,
} from "../constans";

const initialState = {
  posts: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_AND_COMMENTS:
      return { ...state, ...action.payload };
    case CREATE_POST:
      return { ...state, posts: { ...state.posts, ...action.payload } };

    case DELETE_POST:
      delete state.posts[action.payload];
      return state;

    case UPDATE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            ...action.payload,
          },
        },
      };

    case CREATE_COMMENT:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: [
              ...state.posts[action.payload.postId].comments,
              { ...action.payload },
            ],
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
