import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <h1>No Connection Found</h1>;
  }
  return (
    <div className=" my-10 mb-20">
      <h1 className="p-4 pb-2 text-2xl opacity-70 tracking-wide mb-8 text-center font-bold">
        Connections
      </h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, about, photoUrl } = connection;
        return (
          <div key={_id} className="my-2">
            <ul className="list w-6/12 mx-auto   bg-base-200 rounded-box shadow-md">
              <li className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={photoUrl} />
                </div>
                <div>
                  <div className="font-semibold text-xl ml-2">
                    {firstName + " " + lastName}
                  </div>
                  <div className="text-xs  font-semibold opacity-60 ml-2">
                    {about || "This is default about"}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
