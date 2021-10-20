import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, updatePost } from "../../redux/action/post";
import Post from "../../service/post";
import Comment from "../../service/comment";
import { createComment } from "../../redux/action/comment";

export default function AllPosts() {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const { user, post } = useSelector((state) => state);
  const dispatch = useDispatch();
  const userId = Number(localStorage.getItem("userId"));
  const titleRef = useRef();
  const bodyRef = useRef();

  const handleSubmitCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await Post.createPost({
      title: e.target.title.value,
      body: e.target.body.value,
      userId: Number(localStorage.getItem("userId")),
    });
    dispatch(createPost({ [data.id]: { ...data, comments: [] } }));
    titleRef.current.value = "";
    bodyRef.current.value = "";
    setLoading(false);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);
    try {
      await Post.updatePost(editPost, {
        id: editPost,
        userId,
        title: e.target.title.value,
        body: e.target.body.value,
      });
      setLoadingEdit(false);
      setEditPost(null);
      dispatch(
        updatePost({
          id: editPost,
          title: e.target.title.value,
          body: e.target.body.value,
        })
      );
    } catch (error) {
      setLoadingEdit(false);
      setEditPost(null);
      dispatch(
        updatePost({
          id: editPost,
          title: e.target.title.value,
          body: e.target.body.value,
        })
      );
    }
  };

  const deleteMyPost = async (id) => {
    setLoadingDelete(id);
    await Post.deletePost(id);
    dispatch(deletePost(id));
    setLoadingDelete(null);
  };

  const postComments = async (e, id) => {
    e.preventDefault();
    setLoadingComment(id);
    const { data } = await Comment.createComment({
      body: e.target.body.value,
      email: user.users[userId].email,
      postId: id,
      name: user.users[userId].name,
    });
    document.getElementById(`comment-body-${id}`).value = "";
    dispatch(createComment(data));
    setLoadingComment(null);
  };

  return (
    <div className="mr-2">
      <div className="p-4 rounded-md bg-white my-2">
        <form onSubmit={handleSubmitCreatePost}>
          <label className="text-sm">Title</label>
          <input
            ref={titleRef}
            className="w-full border-2 border-gray-400 rounded-md p-2 mb-2"
            placeholder={`Write Your Title Here, ${user?.users[userId]?.name}`}
            name="title"
          />
          <label className="text-sm">Body</label>
          <textarea
            ref={bodyRef}
            name="body"
            className="w-full border-2 border-gray-400 rounded-md p-2"
            placeholder={`What's Happening, ${user?.users[userId]?.name}
        `}
          />
          <div className="flex items-center justify-end">
            {!loading ? (
              <button
                className="py-1 px-2 rounded-md bg-blue-600 text-white"
                type="submit"
              >
                Send
              </button>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </form>
      </div>

      {Object.values(post.posts)
        .reverse()
        .map((item) => (
          <div className="p-4 rounded-md bg-white my-2" key={item.id}>
            <div className="flex flex-row  text-sm mb-3">
              <div className="font-light flex flex-1">
                {user.users[item.userId].name} talks about
              </div>
              <div>
                {item.userId === userId && (
                  <>
                    {editPost !== item.id && (
                      <span
                        onClick={() => setEditPost(item.id)}
                        className="p-1 bg-yellow-500 mr-2 text-white rounded-md cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    {loadingDelete !== item.id ? (
                      <span
                        onClick={() => deleteMyPost(item.id)}
                        className="p-1 bg-red-500 mr-2 text-white rounded-md cursor-pointer"
                      >
                        Delete
                      </span>
                    ) : (
                      <span>loading...</span>
                    )}
                  </>
                )}
              </div>
            </div>
            {editPost === item.id ? (
              <form onSubmit={handleUpdatePost}>
                <label className="text-sm">Title</label>
                <input
                  className="w-full border-2 border-gray-400 rounded-md p-2 mb-2"
                  placeholder={`Write Your Title Here, ${user?.users[userId]?.name}`}
                  name="title"
                  defaultValue={item.title}
                />
                <label className="text-sm">Body</label>
                <textarea
                  defaultValue={item.body}
                  name="body"
                  className="w-full border-2 border-gray-400 rounded-md p-2"
                  placeholder={`What's Happening, ${user?.users[userId]?.name}`}
                />
                <div className="flex items-center justify-end">
                  {!loadingEdit ? (
                    <button
                      className="py-1 px-2 rounded-md bg-blue-600 text-white"
                      type="submit"
                    >
                      Save
                    </button>
                  ) : (
                    <span>Loading...</span>
                  )}
                </div>
              </form>
            ) : (
              <div className="p-2 border-2 rounded-md my-1">
                <div className="font-semibold">{item.title}</div>
                <p>{item.body}</p>
              </div>
            )}
            <div className="font-light text-sm">
              {item.comments.length} people commented
            </div>
            <div>
              {item.comments.map((item2, index2) => (
                <div className="text-sm my-2 pl-4" key={index2}>
                  {" "}
                  <span className="font-bold">{item2.name}</span> {item2.body}{" "}
                </div>
              ))}
              {editPost !== item.id && (
                <div className="pl-4">
                  <form onSubmit={(e) => postComments(e, item.id)}>
                    <input
                      className="w-full border-2 border-gray-400 rounded-md p-2 mb-2"
                      placeholder={`Want to involve, ${user.users[userId].name} ?`}
                      name="body"
                      id={`comment-body-${item.id}`}
                    />
                    <div className="flex items-center justify-end">
                      {loadingComment !== item.id ? (
                        <button
                          className="py-1 px-2 rounded-md bg-blue-600 text-white"
                          type="submit"
                        >
                          Send
                        </button>
                      ) : (
                        <span>Loading...</span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
