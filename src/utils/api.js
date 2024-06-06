import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization:
    "eyJhdWQiOiIwZGJiZjQ0NDFhZjUwMWU5YmM4YjhiMTVhMzI2MjlkOSIsInN1YiI6IjY2NWYyZmYzYmExZjVmMTk5MzUwYTFlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._NTz0S1wOxijDMPzn44Ldf2n1P00it-aHqB02UK7pWw",
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
