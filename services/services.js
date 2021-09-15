import axios from 'axios';
import {API_KEY} from '@env';

const apiUrl = 'https://api.themoviedb.org/3';

// Get Popular Movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?api_key=${API_KEY}`);
  return resp.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?api_key=${API_KEY}`);
  return resp.data.results;
};

// Get Top Rated Movies
export const getTopRated = async () => {
  const resp = await axios.get(`${apiUrl}/movie/top_rated?api_key=${API_KEY}`);
  return resp.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  );
  return resp.data.results;
};

// Get Documnetery Movies
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  );
  return resp.data.results;
};

// Get Movie
export const getMovie = async id => {
  const resp = await axios.get(
    `${apiUrl}/movie/${id}?api_key=${API_KEY}`,
  );
  return resp.data;
};

// Search for Movie 
export const searchMovie = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?api_key=${API_KEY}&query=${query}`,
  );
  return resp.data.results;
};
