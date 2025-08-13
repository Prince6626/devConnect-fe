import axios from "axios";
import React from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constance";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showButtons = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-[342px] mx-auto h-[500px] sm:h-[550px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl bg-gradient-to-b from-black/20 to-black/80 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={photoUrl}
          alt="Photo"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        {/* Name and Age */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4 font-medium">
              {age + " • " + gender}
            </p>
          )}
        </motion.div>

        {/* About */}
        {about && (
          <motion.p
            className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base line-clamp-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {about}
          </motion.p>
        )}

        {/* Skills Tags */}
        {skills && skills.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/30"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        {showButtons && (
          <motion.div
            className="flex justify-center gap-3 sm:gap-6 mt-4 sm:mt-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Skip Button */}
            <motion.button
              className="px-4 sm:px-6 py-2 sm:py-2.5 w-1/2 bg-gray-800/80 backdrop-blur-md rounded-md flex items-center justify-center border border-gray-600/50 hover:border-red-400/70 hover:bg-red-500/20 transition-all duration-300 shadow-lg text-white font-medium text-sm sm:text-base"
              onClick={() => handleSendRequest("ignored", _id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip
            </motion.button>

            {/* Connect Button */}
            <motion.button
              className="px-4 sm:px-6 py-2 sm:py-2.5 w-1/2 bg-blue-600/80 backdrop-blur-md rounded-md flex items-center justify-center border border-blue-500/50 hover:border-blue-400/80 hover:bg-blue-500/40 transition-all duration-300 shadow-lg text-white font-medium text-sm sm:text-base"
              onClick={() => handleSendRequest("interested", _id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;