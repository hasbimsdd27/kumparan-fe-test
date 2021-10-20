import React from "react";

export default function Index() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="p-4 bg-white rounded-md">
        <h4 className="text-xl font-bold">Select Account</h4>
        <select name="user">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    </div>
  );
}
