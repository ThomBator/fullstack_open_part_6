import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import requests from "./requests";
import { useContext } from "react";
import { useNotificationDispatch } from "./NotificationContext.jsx";

const App = () => {
  const dispatch = useNotificationDispatch();
  const getAnecdotes = requests.getAnecdotes;
  const putAnecdotes = requests.putAnecdotes;

  //useQueryClient is used to update cached data under each key
  const queryClient = useQueryClient();

  //The mutation allows you to update the server and invalidate the cache when a server request is successful
  const updateAnecdoteMutation = useMutation(putAnecdotes, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "VOTED", payload: variables.content });
      setTimeout(() => {
        dispatch("");
      }, 5000);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div> loading data... </div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to server problems</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
