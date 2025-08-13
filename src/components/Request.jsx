import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { motion } from "framer-motion";
import { Mail, Clock, Check, X, UserPlus } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-8">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
            <Mail className="w-12 h-12 text-gray-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            No Requests Yet
          </h1>
          <p className="text-gray-400 text-lg">
            When developers want to connect with you, their requests will appear
            here!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-8 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50 backdrop-blur-sm mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <Clock className="w-6 h-6 text-orange-400" />
            <span className="text-gray-300 font-medium">
              {requests.length} Pending Requests
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Connection Requests
          </h1>
          <p className="text-gray-400 text-lg">
            Review and respond to developers who want to connect
          </p>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request, index) => {
            const { _id, firstName, lastName, about, photoUrl, skills } =
              request.fromUserId;

            return (
              <motion.div
                key={_id}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-gray-600/50 group flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Content Container - Takes up available space */}
                <div className="flex-1 p-6">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center text-center mb-4">
                    <motion.div
                      className="relative mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 p-1 shadow-lg">
                        <img
                          className="w-full h-full rounded-full object-cover bg-gray-700"
                          src={photoUrl}
                          alt={`${firstName} ${lastName}`}
                        />
                      </div>
                    </motion.div>

                    {/* Name */}
                    <h3 className="font-bold text-xl text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {firstName + " " + lastName}
                    </h3>

                    {/* About */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {about || "This is default about"}
                    </p>
                  </div>

                  {/* Skills Section */}
                  {skills && skills.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-gradient-to-b from-orange-400 to-red-400 rounded-full"></div>
                        <span className="text-gray-300 font-medium text-sm">
                          Skills
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="px-3 py-1 bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-full text-xs font-medium border border-gray-600/50 text-gray-300 hover:text-white hover:border-orange-500/50 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + skillIndex * 0.05,
                              duration: 0.3,
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons - Sticky at Bottom */}
                <div className="p-6 pt-0">
                  <div className="border-t border-gray-700/50 pt-4">
                    <div className="flex gap-3">
                      <motion.button
                        className="flex-1 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 hover:border-red-400/70 text-red-400 hover:text-red-300 font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm shadow-lg hover:shadow-xl"
                        onClick={() => reviewRequest("rejected", request._id)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Reject</span>
                      </motion.button>

                      <motion.button
                        className="flex-1 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 hover:border-green-400/70 text-green-400 hover:text-green-300 font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm shadow-lg hover:shadow-xl"
                        onClick={() => reviewRequest("accepted", request._id)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Accept</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Request;
