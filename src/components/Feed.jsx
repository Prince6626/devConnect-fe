import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { Users, Heart, Zap, Search, RefreshCw, Sparkles } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    if (feed) return;
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshFeed = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
      setCurrentIndex(0);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] py-8 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50 backdrop-blur-sm mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Search className="w-6 h-6 text-blue-400" />
              <span className="text-gray-300 font-medium">
                Loading Developer Network
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Developer Network
            </h1>
            <p className="text-gray-400 text-lg">
              Loading professional developer profiles...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center">
            <motion.div
              className="relative w-96 h-[600px] rounded-3xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(59, 130, 246, 0.4)",
                  "0 0 0 20px rgba(59, 130, 246, 0)",
                  "0 0 0 0px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <Sparkles className="w-12 h-12 text-blue-400 mx-auto" />
                </motion.div>
                <p className="text-gray-300 text-lg font-medium">
                  Loading profiles...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Hang tight while we find your matches
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // No Users Found State
  if (!feed || feed.length <= 0) {
    return (
      <div className="min-h-screen bg-[#121212] py-8 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50 backdrop-blur-sm mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-gray-300 font-medium">
                Developer Network
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Developer Network
            </h1>
            <p className="text-gray-400 text-lg">
              Expand your professional network with skilled developers
            </p>
          </div>

          {/* Empty State */}
          <div className="flex justify-center">
            <motion.div
              className="relative w-96 h-[600px] rounded-3xl bg-gradient-to-b from-gray-800/30 to-gray-900/50 backdrop-blur-md border border-gray-700/50 flex flex-col items-center justify-center text-center p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 rounded-3xl opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-rose-400/20 rounded-3xl"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-6"
                >
                  <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  No New Profiles Available
                </h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  You've reviewed all available developer profiles. Check back
                  later for new professionals to network with.
                </p>

                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl mx-auto"
                  onClick={refreshFeed}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  <RefreshCw
                    className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                  />
                  Load New Profiles
                </motion.button>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-8 right-8 w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="absolute bottom-16 left-8 w-1 h-1 bg-purple-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute top-16 left-12 w-1.5 h-1.5 bg-rose-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Feed with Users
  return (
    <div className="min-h-screen bg-[#121212] py-8 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12 z-10">
          <motion.div
            className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50 backdrop-blur-sm mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-gray-300 font-medium">
              {feed.length} Professional{feed.length !== 1 ? "s" : ""} Available
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Developer Network
          </h1>
          <p className="text-gray-400 text-lg">
            Discover and network with talented developers
          </p>
        </div>

        {/* User Card Display */}
        <div className="flex justify-center relative px-4">
          <AnimatePresence mode="wait">
            {feed && feed[currentIndex] && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
              >
                <UserCard user={feed[currentIndex]} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Cards Effect - Hide on mobile for better performance */}
          <div className="absolute inset-0 -z-10 hidden sm:block">
            {[1, 2].map((offset) => (
              <motion.div
                key={offset}
                className="absolute inset-0 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-3xl bg-gray-800/20 backdrop-blur-sm border border-gray-700/30"
                style={{
                  transform: `translateX(${offset * 8}px) translateY(${
                    offset * 8
                  }px) scale(${1 - offset * 0.02})`,
                  zIndex: -offset,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: offset * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Stats/Info - Mobile Responsive */}
        <motion.div
          className="mt-12 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Mobile Layout - Stacked */}
          <div className="flex flex-col sm:hidden gap-3 max-w-sm mx-auto">
            <div className="flex items-center justify-center gap-2 bg-gray-800/30 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-700/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300 text-sm font-medium">
                Active Network
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 bg-gray-800/30 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-700/50">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm font-medium">
                Profile {currentIndex + 1} of {feed.length}
              </span>
            </div>

            <motion.button
              className="flex items-center justify-center gap-2 bg-gray-800/30 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-700/50 text-gray-300 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300"
              onClick={refreshFeed}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span className="text-sm font-medium">Load More</span>
            </motion.button>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:inline-flex items-center gap-6 bg-gray-800/30 backdrop-blur-md rounded-2xl px-8 py-4 border border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300 text-sm font-medium">
                Active Network
              </span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm font-medium">
                Profile {currentIndex + 1} of {feed.length}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <motion.button
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
              onClick={refreshFeed}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span className="text-sm font-medium">Load More</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Feed;
