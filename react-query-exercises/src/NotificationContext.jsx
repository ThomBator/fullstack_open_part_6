import { createContext, useReducer, useContext } from "react";

//you still need to understand how state factors into this reducer
//Do I need to store an initial state somewhere

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATED":
      return `anecdote ${action.payload} created`;

    case "VOTED":
      return `anecdote ${action.payload} voted`;

    case "MINLENGTH":
      return `anecdote is too short, must have length of 5 or more characters.`;

    default:
      return "";
  }
};

//the context is used to pass state around the application
const NotificationContext = createContext();

//This is the component that can wrap the app to manage state
//It is basically ust a more clean way to deliver the provider component provided by createContext

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

//Can be used to display current state in other components
export const useNotificationValue = () => {
  const notificationAndDisptach = useContext(NotificationContext);
  return notificationAndDisptach[0];
};

//Can be used to modify current state from other components.
export const useNotificationDispatch = () => {
  const notificationAndDisptach = useContext(NotificationContext);
  return notificationAndDisptach[1];
};

export default NotificationContext;
