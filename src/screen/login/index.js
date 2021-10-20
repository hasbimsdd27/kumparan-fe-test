import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function Index() {
  const history = useHistory();
  const [account, setSelectedAccount] = useState([]);
  const user = useSelector((store) => store.user);
  const [error, setError] = useState(null);

  const handleChangeAccount = (e) => {
    setError(null);
    setSelectedAccount(user.users[e.target.value]);
  };

  const handleContinueAccount = (e) => {
    e.preventDefault();
    setError(null);
    if (!account.id) {
      setError("Please Select An Account");
    } else {
      localStorage.setItem("userId", account.id);
      history.push("/home");
    }
  };

  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      history.push("/home");
    }
  }, [history]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="p-4 bg-white rounded-md">
        <h4 className="text-xl font-bold mb-2 text-center">Select Account</h4>
        {user.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <select
              name="user"
              className="w-full p-2 bg-white border-2 border-gray-600 rounded-md focus:outline-none"
              onChange={handleChangeAccount}
            >
              <option value="-">- Please Select Account -</option>
              {Object.values(user.users).map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name} ({item.username})
                </option>
              ))}
            </select>
            {!!error && (
              <div className="text-center text-red-600 mt-1">{error}</div>
            )}
            <div className="mt-2 flex flex-center justify-center">
              <button
                className="bg-blue-500 p-2 rounded-md text-white"
                onClick={handleContinueAccount}
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
