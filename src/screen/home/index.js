import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllPostAndComment } from "../../redux/action/post";
import { getAllUser } from "../../redux/action/user";
import User from "../../service/user";
import Post from "../../service/post";
import Comment from "../../service/comment";
import Navbar from "../../components/navbar";
import AllUsers from "./allUsers";
import AllPosts from "./allPosts";

export default function Index() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, post } = useSelector((state) => state);

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

  const initValue = useCallback(() => {
    if (user.users.length === 0) {
      fetchAllUser();
    }
    fetchPostAndComment();
  }, [fetchAllUser, user.users, fetchPostAndComment]);

  useEffect(() => {
    initValue();
  }, [initValue]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      history.push("/");
    }
  }, [history]);

  if (user.isLoading || post.isLoading) return <>Loading</>;

  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex flex-row mt-4">
        <div className="flex p-2 mx-4">
          <AllUsers />
        </div>
        <div className="flex flex-1 p-2 mx-4">
          <AllPosts />
        </div>
      </div>
    </div>
  );
}
