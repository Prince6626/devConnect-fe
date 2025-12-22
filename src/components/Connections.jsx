import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { motion } from "framer-motion";
import { Users, UserCheck, MessageCircle, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { getSocket } from "../utils/socket";
import { setNotifications } from "../utils/notificationSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const notifications = useSelector((store) => store.notifications);
  const user = useSelector((store) => store.user);
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

  const fetchUnreadCounts = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/unread/all", {
        withCredentials: true,
      });
      console.log("📥 Fetched unread counts from database:", res.data.unreadCounts);
      // Set notifications from database
      dispatch(setNotifications(res.data.unreadCounts));
    } catch (err) {
      console.log("Error fetching unread counts:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
    fetchUnreadCounts(); // Fetch persisted unread counts
  }, []);

  // Register for notifications when user is available
  useEffect(() => {
    if (user?._id) {
      const socket = getSocket();
      console.log("📡 Registering user for notifications:", user._id);
      socket.emit("registerUser", { userId: user._id });
    } else {
      console.log("⚠️ User not found, waiting for user data...");
    }
  }, [user]);

  // Debug: Log notification state changes
  useEffect(() => {
    console.log("🔔 Notifications state updated:", notifications);
  }, [notifications]);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-8">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
            <Users className="w-12 h-12 text-gray-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            No Connections Yet
          </h1>
          <p className="text-gray-400 text-lg">
            Start connecting with other developers to build your network!
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
            <UserCheck className="w-6 h-6 text-blue-400" />
            <span className="text-gray-300 font-medium">
              {connections.length} Connections
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Your Network
          </h1>
          <p className="text-gray-400 text-lg">
            Connect, collaborate, and grow together
          </p>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection, index) => {
            const { _id, firstName, lastName, about, photoUrl, skills } =
              connection;

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
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 shadow-lg">
                        <img
                          className="w-full h-full rounded-full object-cover bg-gray-700"
                          src={photoUrl}
                          alt={`${firstName} ${lastName}`}
                        />
                      </div>
                      
                      {/* Notification Badge */}
                      {notifications[_id] && notifications[_id] > 0 && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-gray-800 shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <span className="text-white text-xs font-bold">
                            {notifications[_id] > 9 ? "9+" : notifications[_id]}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Name */}
                    <h3 className="font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
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
                        <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                        <span className="text-gray-300 font-medium text-sm">
                          Skills
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="px-3 py-1 bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-full text-xs font-medium border border-gray-600/50 text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
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

                {/* Chat Button - Sticky at Bottom */}
                <div className="p-6 pt-0">
                  <div className="border-t border-gray-700/50 pt-4">
                    <Link to={"/chat/" + _id} className="block">
                      <motion.button
                        className="w-full bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 backdrop-blur-md rounded-xl py-3 px-4 border border-blue-500/50 hover:border-blue-400/70 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-white font-medium group"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>Start Chat</span>
                      </motion.button>
                    </Link>
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

export default Connections;
