import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);
//   switch (action.type) {
//     case "NEW ANECDOTE":
//       return [...state, action.payload];

//     case "VOTE":
//       const id = action.payload.id;
//       const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       );
//     default:
//       return state;
//   }
// };

// //action creators

// //Take id as param and returns an action with type "VOTE" and payload of id
// export const vote = (id) => {
//   return { type: "VOTE", payload: { id } };
// };

// //Takes an anecdote as a param and returns an action with type "NEW ANECDOTE" and payload matching anecdote asObject function defined above.
// export const newAnecdote = (anecdote) => {
//   return {
//     type: "NEW ANECDOTE",
//     payload: {
//       content: anecdote,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

// export default anecdoteReducer;

export const { setAnecdotes, appendAnecdote, vote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch, getState) => {
    await anecdoteService.updateVotes(anecdote.id, anecdote.votes + 1);
    dispatch(vote(anecdote.id));
  };
};
export default anecdoteSlice.reducer;
