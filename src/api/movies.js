import axios from "axios";

const realtimeDatabaseURI =
  "https://royal-films-module-default-rtdb.firebaseio.com/";

export const getMoviesRequest = () =>
  axios.get(`${realtimeDatabaseURI}/movies.json`);
export const createNewMovieRequest = movie =>
  axios.post(`${realtimeDatabaseURI}/movies.json`, movie);
export const updateMovieRequest = (id, movie) =>
  axios.patch(`${realtimeDatabaseURI}/movies/${id}.json`, movie);
export const deleteMovieRequest = id =>
  axios.delete(`${realtimeDatabaseURI}/movies/${id}.json`);
