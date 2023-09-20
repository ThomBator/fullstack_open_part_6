import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

//generate ID for anecdote

const getId = () => {
  const id = (Math.random() * 10000).toFixed(0);
};

const getAnecdotes = async () => {
  const result = await axios.get(baseURL);
  return result.data;
};

const postAnecdotes = async (anecdote) => {
  const id = getId();

  const anecdoteObj = {
    content: anecdote,
    id,
    votes: 0,
  };

  console.log(anecdoteObj);
  const result = await axios.post(baseURL, anecdoteObj);

  return result;
};

const putAnecdotes = async (anecdote) => {
  const result = await axios.put(`${baseURL}/${anecdote.id}`, anecdote);
  return result;
};

const dbRequests = { postAnecdotes, getAnecdotes, putAnecdotes };

export default dbRequests;
