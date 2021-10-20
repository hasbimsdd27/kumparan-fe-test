import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "../../components/navbar";
import AllUsers from "./allUsers";
import AllPosts from "./allPosts";

export default function Index() {
  const history = useHistory();

  const { user, post } = useSelector((state) => state);

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
