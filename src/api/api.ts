import axios from "axios";
import { BASEURL } from "../Constants";

export const baseUrl = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});
