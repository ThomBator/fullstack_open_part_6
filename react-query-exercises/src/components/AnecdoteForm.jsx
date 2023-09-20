import requests from "../requests.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNotificationDispatch } from "../NotificationContext.jsx";

const AnecdoteForm = () => {
  //modify notification message stored in context
  const dispatch = useNotificationDispatch();

  //create a query client to invalidate data in cache
  const queryClient = useQueryClient();
  //use put request function from requests.js
  const createAnecdote = requests.postAnecdotes;
  //implement adding to database with useMutation
  //Post requests will be rejectd if content < 5 chars. worry about error handling later

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "CREATED", payload: variables });
      setTimeout(() => {
        dispatch("");
      }, 5000);
    },
    onError: () => {
      dispatch({ type: "MINLENGTH" });
      setTimeout(() => {
        dispatch("");
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
