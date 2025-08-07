import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      //TODO
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length <= 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-3xl font-semibold text-rose-500 tracking-wide">
          New Users not found!
        </p>
      </div>
    );
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
