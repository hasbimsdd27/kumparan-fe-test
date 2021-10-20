import API from "../configs";

const Posts = {
  getAllPost: () => API.get("/posts"),
  createPost: (data) => API.post("/posts", data),
  deletePost: (id) => API.delete(`/posts/${id}`),
  updatePost: (id, data) => API.put(`/posts/${id}`, data),
};

export default Posts;
