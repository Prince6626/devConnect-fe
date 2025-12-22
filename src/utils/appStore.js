import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Make sure path is correct
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestSlice";
import notificationReducer from "./notificationSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer, // ✅ use the reducer from createSlice
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestsReducer,
    notifications: notificationReducer,
  },
});

export default appStore;
