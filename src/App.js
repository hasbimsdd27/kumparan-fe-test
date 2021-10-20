import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./screen/login";
import Home from "./screen/home";
import Profile from "./screen/profile";
import AlbumsScreen from "./screen/albums";
import { useDispatch, useSelector } from "react-redux";

import User from "./service/user";
import Post from "./service/post";
import Comment from "./service/comment";
import { getAllPostAndComment } from "./redux/action/post";
import { getAllUser } from "./redux/action/user";
import { getAllAlbumAndPost } from "./redux/action/album";
import Albums from "./service/album";

export default function App() {
  const dispatch = useDispatch();
  const { album, post, user } = useSelector((state) => state);
  const fetchAllUser = useCallback(async () => {
    dispatch(getAllUser({ isLoading: true }));
    const { data } = await User.getAllUsers();
    const usersList = data.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
    dispatch(getAllUser({ users: usersList, isLoading: false }));
  }, [dispatch]);

  const fetchPostAndComment = useCallback(async () => {
    dispatch(getAllPostAndComment({ isLoading: true }));
    const resPosts = await Post.getAllPost();
    const resComment = await Comment.getAllComments();
    const grouppedComment = resComment.data.reduce((obj, item) => {
      if (!!obj?.[item.postId]) {
        obj[item.postId] = [...obj[item.postId], item];
      } else {
        obj[item.postId] = [item];
      }
      return obj;
    }, {});
    const postsToObject = resPosts.data.reduce((obj, item) => {
      obj[item.id] = { ...item, comments: grouppedComment[item.id] };
      return obj;
    }, {});
    dispatch(getAllPostAndComment({ isLoading: false, posts: postsToObject }));
  }, [dispatch]);

  const fetchAlbumAndPhotos = useCallback(async () => {
    dispatch(getAllAlbumAndPost({ isLoading: true }));
    const resAlbums = await Albums.getAllAlbums();
    const resPhotos = await Albums.getAllPhotos();

    const groupedPhotos = resPhotos.data.reduce((obj, item) => {
      if (!!obj?.[item.albumId]) {
        obj[item.albumId] = [...obj[item.albumId], item];
      } else {
        obj[item.albumId] = [item];
      }
      return obj;
    }, {});
    const groupedAlbums = resAlbums.data.reduce((obj, item) => {
      obj[item.id] = { ...item, photos: groupedPhotos[item.id] };
      return obj;
    }, {});

    dispatch(getAllAlbumAndPost({ isLoading: false, albums: groupedAlbums }));
  }, [dispatch]);

  useEffect(() => {
    fetchAllUser();
    fetchPostAndComment();
    fetchAlbumAndPhotos();
  }, [fetchAllUser, fetchPostAndComment, fetchAlbumAndPhotos]);

  if (!!album.isLoading || !!post.isLoading || !!user.isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gray-200">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-200">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/profile/:userId" exact>
            <Profile />
          </Route>
          <Route exact path="/album/:albumId">
            <AlbumsScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
