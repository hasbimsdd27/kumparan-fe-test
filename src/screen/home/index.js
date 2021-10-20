import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import User from "../../service/user";

export default function Index() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const getAllUser = useCallback(async () => {
    dispatch(getAllUser({ isLoading: true }));
    const { data } = await User.getAllUsers();
    const usersList = data.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
    dispatch(getAllUser({ users: usersList, isLoading: false }));
  }, [dispatch]);

  const initValue = useCallback(() => {
    if (user.users.length === 0) {
      getAllUser();
    }
  }, [getAllUser, user.users]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      history.push("/");
    } else {
      initValue();
    }
  }, [history, initValue]);

  return <div>Home</div>;
}
