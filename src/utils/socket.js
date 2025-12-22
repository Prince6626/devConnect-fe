import io from "socket.io-client";
import { BASE_URL } from "./constance";
import appStore from "./appStore";
import { addNotification } from "./notificationSlice";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL);
    console.log("🔌 Socket connection created");
    
    // Global listener for notifications
    socket.on("messageNotification", ({ senderId, senderName, text }) => {
      console.log("🔔 Notification received:", { senderId, senderName, text });
      
      // Get current user from store
      const state = appStore.getState();
      const currentUserId = state.user?._id;
      
      console.log("Current user ID:", currentUserId, "Sender ID:", senderId);
      
      // Only add notification if the sender is not the current user
      if (senderId !== currentUserId) {
        console.log("✅ Adding notification for user:", senderId);
        appStore.dispatch(addNotification({ userId: senderId }));
      } else {
        console.log("❌ Skipping notification (sender is current user)");
      }
    });
    
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });
    
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }
  return socket;
};

// Backward compatibility
export const createSocketConnection = () => {
  return getSocket();
};