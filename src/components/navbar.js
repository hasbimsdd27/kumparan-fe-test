import React from "react";
import { useHistory } from "react-router";

export default function Navbar() {
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    history.push("/");
  };
  return (
    <div className="py-4 px-10 bg-blue-600 flex flex-row items-center">
      <div className="text-white font-bold flex flex-1">Simple SocMed</div>
      <div className="text-white">
        <button
          className="py-1 px-3 bg-red-600 rounded-md font-bold text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
