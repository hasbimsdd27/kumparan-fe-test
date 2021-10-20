import React from "react";
import { useSelector } from "react-redux";

export default function AllUsers() {
  const { user } = useSelector((state) => state);
  return (
    <div className="bg-white rounded-md p-2 w-full">
      <h1 className="font-bold text-xl"> See Other People Profile </h1>

      <div className="mt-4">
        {Object.values(user.users)
          .filter((item) => item.id !== Number(localStorage.getItem("userId")))
          .map((item) => (
            <div className="cursor-pointer hover:bg-gray-100" key={item.id}>
              <div className="p-2">
                {item.name} ({item.username})
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
