import { baseUrl } from "./api";

// GET genre
export const getGenres = async () => {
  const response = await baseUrl.get("genre/movie/list");
  return response?.data;
};

// GET movie details
export const getMovieDetails = async (movie_id?: number) => {
  const response = await baseUrl.get(`movie/${movie_id}`);
  return response?.data;
};

// GET now playing movies
export const getNowPlaying = async () => {
  const response = await baseUrl.get(
    `movie/now_playing?language=en-US&page=1}`
  );
  return response?.data;
};

// GET popular movies
export const getPopularMovies = async (page = 1) => {
  const response = await baseUrl.get(
    `movie/popular?language=en-US&page=${page}`
  );
  return response?.data;
};

// Image path
export const getImage = (poster: string) => {
  return `https://image.tmdb.org/t/p/original${poster}`;
};

// GET trending movie
export const getTrendingMovies = async () => {
  const response = await baseUrl("trending/movie/week?language=en-US");
  return response.data;
};

// GET trending TV shows
export const getTrendingSeries = async () => {
  const response = await baseUrl("trending/tv/week?language=en-US");
  return response.data;
};

// GET series details
export const getSeriesdetails = async (series_id?: number) => {
  const response = await baseUrl(`tv/${series_id}`);
  return response.data;
};

// GET search movie
export const getSearchMovie = async (query?: string) => {
  const response = await baseUrl(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
};
