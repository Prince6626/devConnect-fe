import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return <h1>Request Not Found</h1>;
  }

  return (
    <div className="my-10 px-4">
      <h1 className="text-2xl opacity-70 tracking-wide text-center font-bold mb-8">
        Requests
      </h1>

      <div className="flex flex-col gap-4 items-center">
        {requests.map((request) => {
          const { _id, firstName, lastName, about, photoUrl } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="w-full max-w-2xl bg-base-300 rounded-box shadow-md p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={ photoUrl }
                alt="profile"
              />
              <div className="flex-1">
                <div className="font-semibold text-xl">
                  {firstName + " " + lastName}
                </div>
                <div className="text-sm font-medium opacity-60">
                  {about || "This is default about"}
                </div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-auto">
                <button
                  className="btn btn-primary "
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
