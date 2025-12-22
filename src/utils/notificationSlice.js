import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {}, // { userId: unreadCount }
  reducers: {
    addNotification: (state, action) => {
      const { userId } = action.payload;
      state[userId] = (state[userId] || 0) + 1;
    },
    clearNotification: (state, action) => {
      const { userId } = action.payload;
      delete state[userId];
    },
    clearAllNotifications: () => ({}),
    // Set notifications from database (for offline support)
    setNotifications: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addNotification, clearNotification, clearAllNotifications, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
