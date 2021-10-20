import API from "../configs";

const User = {
  getAllUsers: () => API.get("/users"),
};

export default User;
