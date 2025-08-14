import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constance";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
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
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    // as soon as the page loaded, the socket connection is made and joinChat event it emit
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text, photoUrl }) => {
      console.log(firstName + " " + text);
      setMessage((messages) => [...messages, { firstName, photoUrl, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage(" ");
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto h-[88vh] flex flex-col rounded-md bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-xl text-white tracking-tight">
                  Messages
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
              <span className="text-gray-300 font-medium text-sm">Active Chat</span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-900/20 to-gray-800/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent hover:scrollbar-thumb-gray-500/50">
          {message.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 border border-gray-700/50">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start a conversation</h3>
              <p className="text-gray-400">Send a message to begin your chat</p>
            </div>
          ) : (
            message.map((msg, index) => {
              const isCurrentUser = user.firstName === msg.firstName;
              return (
                <div
                  key={index}
                  className={`flex items-end gap-3 group hover:bg-gray-800/20 rounded-xl p-3 -mx-3 transition-all duration-300 ${
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        alt={`${msg.firstName}'s avatar`}
                        src={msg.photoUrl}
                        className="w-full h-full rounded-full object-cover bg-gray-700"
                      />
                    </div>
                  </div>

                  {/* Message Content */}
                  <div
                    className={`max-w-xs lg:max-w-md ${
                      isCurrentUser ? "text-right" : "text-left"
                    }`}
                  >
                    {/* Name and Time */}
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isCurrentUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        {msg.firstName}
                      </span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl max-w-full break-words shadow-lg transform transition-all duration-300 hover:shadow-xl relative ${
                        isCurrentUser
                          ? "bg-gradient-to-br from-blue-600/80 to-blue-700/80 text-white rounded-br-md border border-blue-500/50 backdrop-blur-md"
                          : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 text-white rounded-bl-md border border-gray-600/50 backdrop-blur-md"
                      }`}
                    >
                      <div className="relative z-10 font-medium leading-relaxed">
                        {msg.text}
                      </div>
                      
                      {/* Subtle glow effect */}
                      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isCurrentUser 
                          ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20" 
                          : "bg-gradient-to-br from-gray-600/20 to-gray-700/20"
                      }`}></div>
                    </div>

                    {/* Delivery Status */}
                    <div
                      className={`text-xs text-gray-500 mt-2 flex items-center gap-1 ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Area */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 border-t border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                className="w-full bg-gray-700/50 backdrop-blur-md text-white rounded-2xl px-6 py-4 pl-6 pr-14 border border-gray-600/50 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 placeholder-gray-400 hover:bg-gray-700/70 shadow-lg"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                </svg>
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600/50 disabled:to-gray-700/50 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 focus:scale-95 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3 border border-blue-500/50 hover:border-blue-400/70 backdrop-blur-md"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chat;