import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = asObject(content);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVotes = async (id, newVotes) => {
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: newVotes,
  });
  return response;
};

const anecdotes = {
  getAll,
  createNew,
  updateVotes,
};

export default anecdotes;
