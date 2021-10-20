import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/action/comment";
import Comments from "../../service/comment";

export default function Posts(props) {
  const dispatch = useDispatch();
  const { post, user } = useSelector((state) => state);
  const userId = Number(localStorage.getItem("userId"));
  const [LoadingComment, setLoadingComment] = useState({});

  const HandleComment = async (e, id) => {
    e.preventDefault();
    setLoadingComment((prev) => ({ ...prev, [id]: true }));
    const { data } = await Comments.createComment({
      body: e.target.body.value,
      email: user.users[userId].email,
      postId: id,
      name: user.users[userId].name,
    });

    dispatch(createComment(data));
    setLoadingComment({});

    document.getElementById(`comment-body-${id}`).value = "";
    setLoadingComment((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div>
      {" "}
      {Object.values(post.posts)
        .filter((item) => item.userId === Number(props.userId))
        .reverse()
        .map((item) => (
          <div className="p-4 rounded-md bg-white my-2" key={item.id}>
            <div className="flex flex-row  text-sm mb-3">
              <div className="font-light flex flex-1">
                {user.users[item.userId].name} talks about
              </div>
            </div>

            <div className="p-2 border-2 rounded-md my-1">
              <div className="font-semibold">{item.title}</div>
              <p>{item.body}</p>
            </div>

            <div className="font-light text-sm">
              {item.comments.length} people commented
            </div>
            <div>
              {item.comments.map((item2, index2) => (
                <div className="text-sm my-2 pl-4 flex flex-row" key={index2}>
                  <div className="flex flex-1">
                    <p>
                      <span className="font-bold">{item2.name}</span>{" "}
                      {item2.body}{" "}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pl-4">
                <form onSubmit={(e) => HandleComment(e, item.id)}>
                  <input
                    className="w-full border-2 border-gray-400 rounded-md p-2 mb-2"
                    placeholder={`Want to involve, ${user.users[userId].name} ?`}
                    name="body"
                    id={`comment-body-${item.id}`}
                  />
                  <div className="flex items-center justify-end">
                    {!LoadingComment[item.id] ? (
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
            </div>
          </div>
        ))}
    </div>
  );
}
