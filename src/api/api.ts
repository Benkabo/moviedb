import axios from "axios";
import { BASEURL } from "../Constants";

export const baseUrl = axios.create({
  baseURL: BASEURL,
  params: {
    api_key: `${import.meta.env.VITE_TMDB_API_KEY}`,
  },
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});
