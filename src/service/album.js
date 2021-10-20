import API from "../configs";

const Albums = {
  getAllAlbums: () => API.get("/albums"),
  getAllPhotos: () => API.get("/photos"),
};

export default Albums;
