import API from "../configs";

const Comments = {
  getAllComments: () => API.get("/comments"),
};

export default Comments;
