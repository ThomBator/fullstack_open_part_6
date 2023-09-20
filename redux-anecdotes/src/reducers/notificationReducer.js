import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      console.log("action", action.payload);
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

export const { updateNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification, timeInSeconds) => {
  return (dispatch) => {
    dispatch(updateNotification(notification));

    setTimeout(() => {
      dispatch(removeNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
