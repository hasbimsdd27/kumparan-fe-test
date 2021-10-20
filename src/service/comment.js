import API from "../configs";

const Comments = {
  getAllComments: () => API.get("/comments"),
  createComment: (data) => API.post("/comments", data),
  deleteComment: (id) => API.delete(`/comments/${id}`),
  updateComment: (id, data) => API.put(`/comments/${id}`, data),
};

export default Comments;
