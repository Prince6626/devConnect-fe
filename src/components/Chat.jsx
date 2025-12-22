import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getSocket } from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constance";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, MoreVertical, Phone, Video, Smile } from "lucide-react";
import { clearNotification } from "../utils/notificationSlice";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      console.log(chat.data.messages);
      const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          photoUrl: msg?.senderId?.photoUrl,
          text: msg?.text,
        };
      });
      setMessage(chatMessages);

      // Get target user info from first message or fetch separately
      if (chat?.data?.messages?.length > 0) {
        const firstOtherMessage = chat.data.messages.find(
          (msg) => msg.senderId._id !== userId
        );
        if (firstOtherMessage) {
          setTargetUser({
            firstName: firstOtherMessage.senderId.firstName,
            lastName: firstOtherMessage.senderId.lastName,
            photoUrl: firstOtherMessage.senderId.photoUrl,
          });
        }
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    
    // Clear notifications for this user when entering chat
    dispatch(clearNotification({ userId: targetUserId }));
  }, []);

  useEffect(() => {
    const socket = getSocket();
    
    // Register user connection
    socket.emit("registerUser", { userId });
    
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text, photoUrl }) => {
      console.log(firstName + " " + text);
      setMessage((messages) => [...messages, { firstName, photoUrl, text }]);
      setIsTyping(false);
    });

    return () => {
      // Don't disconnect the socket, just clean up listeners
      socket.off("messageRecieved");
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const socket = getSocket();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center py-4 sm:py-8 px-2 sm:px-4">
      <motion.div
        className="w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 backdrop-blur-sm p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              {/* Back Button */}
              <Link to="/connections">
                <motion.button
                  className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </motion.button>
              </Link>

              {/* User Avatar & Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 shadow-lg">
                    <img
                      src={targetUser?.photoUrl || "https://via.placeholder.com/150"}
                      alt={targetUser?.firstName || "User"}
                      className="w-full h-full rounded-full object-cover bg-gray-700"
                    />
                  </div>
                  {/* Online Status Indicator */}
                  {/* <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-800 shadow-lg shadow-green-400/50"></div> */}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h1 className="font-bold text-base sm:text-lg text-white tracking-tight truncate">
                    {targetUser
                      ? `${targetUser.firstName} ${targetUser.lastName || ""}`
                      : "Loading..."}
                  </h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    {/* <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> */}
                    {/* <span className="text-green-400 text-xs sm:text-sm font-medium">
                      {isTyping ? "Typing..." : "Online"}
                    </span> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* <motion.button
                className="p-2 sm:p-2.5 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600/50 hidden sm:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </motion.button>
              <motion.button
                className="p-2 sm:p-2.5 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600/50 hidden sm:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </motion.button>
              <motion.button
                className="p-2 sm:p-2.5 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white transition-colors" />
              </motion.button> */}
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-gray-900/20 to-gray-800/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent hover:scrollbar-thumb-gray-500/50">
          {message.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center h-full text-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center mb-6 border border-gray-700/50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Start a conversation
              </h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-sm">
                Send a message to begin your chat and start building a meaningful connection
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {message.map((msg, index) => {
                const isCurrentUser = user.firstName === msg.firstName;
                return (
                  <motion.div
                    key={index}
                    className={`flex items-end gap-2 sm:gap-3 group ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {/* Avatar */}
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-0.5 sm:p-1 shadow-lg">
                        <img
                          alt={`${msg.firstName}'s avatar`}
                          src={msg.photoUrl}
                          className="w-full h-full rounded-full object-cover bg-gray-700"
                        />
                      </div>
                    </motion.div>

                    {/* Message Content */}
                    <div
                      className={`max-w-[75%] sm:max-w-xs lg:max-w-md ${
                        isCurrentUser ? "text-right" : "text-left"
                      }`}
                    >
                      {/* Name */}
                      <div
                        className={`flex items-center gap-2 mb-1.5 ${
                          isCurrentUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {msg.firstName}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <motion.div
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-lg relative overflow-hidden ${
                          isCurrentUser
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md border border-blue-500/50"
                            : "bg-gradient-to-br from-gray-700/80 to-gray-800/80 text-white rounded-bl-md border border-gray-600/50"
                        }`}
                        style={{ 
                          maxWidth: '100%',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          display: 'inline-block',
                          textAlign: 'left'
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative z-10 text-sm sm:text-base font-medium leading-relaxed" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                          {msg.text}
                        </div>

                        {/* Animated glow effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl ${
                            isCurrentUser
                              ? "bg-gradient-to-br from-blue-400/20 to-blue-600/20"
                              : "bg-gradient-to-br from-gray-500/20 to-gray-700/20"
                          }`}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>

                      {/* Timestamp */}
                      <div
                        className={`text-xs text-gray-500 mt-1.5 flex items-center gap-1 ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span>Just now</span>
                        {isCurrentUser && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                              <span className="text-blue-400">Sent</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 backdrop-blur-sm p-4 sm:p-6 border-t border-gray-700/50">
          <div className="flex items-end gap-2 sm:gap-3">
            {/* Emoji Button
            <motion.button
              className="p-2.5 sm:p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600/50 mb-1 hidden sm:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smile className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" />
            </motion.button> */}

            {/* Input Field */}
            <div className="flex-1 relative">
              <textarea
                className="w-full bg-gray-700/50 backdrop-blur-md text-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-gray-600/50 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 placeholder-gray-400 hover:bg-gray-700/70 shadow-lg resize-none text-sm sm:text-base"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows="1"
                style={{
                  minHeight: "48px",
                  maxHeight: "120px",
                }}
              />
            </div>

            {/* Send Button */}
            <motion.button
              className={`p-3 sm:p-4 rounded-2xl font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border backdrop-blur-md mb-1 ${
                newMessage.trim()
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-500/50 hover:border-blue-400/70 text-white hover:shadow-xl"
                  : "bg-gray-700/50 border-gray-600/50 text-gray-500 cursor-not-allowed"
              }`}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              whileHover={newMessage.trim() ? { scale: 1.05 } : {}}
              whileTap={newMessage.trim() ? { scale: 0.95 } : {}}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Send</span>
            </motion.button>
          </div>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex items-center gap-2 mt-3 text-xs text-gray-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex gap-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span>{targetUser?.firstName} is typing...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;