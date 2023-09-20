import { useSelector, useDispatch } from "react-redux";

import { updateVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  //useSelector is pass by reference and you are not allowed to mutate the Redux state
  //So you need to spread the return value into a new array to there is no direct reference any more
  //This makes it possible to sort the array afterwards

  const unsortedAnecdotes = [
    ...useSelector((state) => {
      if (state.filter.length > 0) {
        return state.anecdotes.filter((anecdote) =>
          anecdote.content.includes(state.filter)
        );
      }
      return state.anecdotes;
    }),
  ];

  //In principle you don't actually need to use the spread operator here.
  //However it is best practice in react to have everything be immutable
  //So it is better to return a new array I think?
  const anecdotes = [...unsortedAnecdotes.sort((a, b) => b.votes - a.votes)];

  const dispatch = useDispatch();

  const voteHandler = (anecdote) => {
    dispatch(updateVote(anecdote));

    dispatch(setNotification(`You voted for ${anecdote.content}`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteHandler(anecdote)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
