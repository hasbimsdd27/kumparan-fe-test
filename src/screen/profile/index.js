import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Navbar from "../../components/navbar";
import Album from "./album";
import Posts from "./posts";

export default function Index() {
  const { userId } = useParams();
  const { user } = useSelector((state) => state);
  const [tabs, setTabs] = useState(0);

  const handleSwitch = (e, value) => {
    e.preventDefault();
    setTabs(value);
  };

  const render = [<Posts userId={userId} />, <Album userId={userId} />];

  return (
    <div className="w-screen">
      <Navbar />
      <div className=" mt-4 flex items-center justify-center">
        <div className="w-11/12 bg-white p-4 rounded-md">
          <h4 className="text-center">
            Welcome to <b>{user?.users[userId]?.name}</b> Profile
          </h4>
          <div className="flex flex-row">
            <div
              className={`mr-4 p-1 border-2 border-gray-500 rounded-md cursor-pointer ${
                tabs === 0 && "bg-blue-500 text-white"
              }`}
              onClick={(e) => handleSwitch(e, 0)}
            >
              Posts
            </div>
            <div
              className={`mr-4 p-1 border-2 border-gray-500 rounded-md cursor-pointer ${
                tabs === 1 && "bg-blue-500 text-white"
              }`}
              onClick={(e) => handleSwitch(e, 1)}
            >
              Albums
            </div>
          </div>
          <div className="mt-4">{render[tabs]}</div>
        </div>
      </div>
    </div>
  );
}
