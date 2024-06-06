import { useEffect, useState } from "react";
import "./App.css";

import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useSearchMoviesQuery,
  useUpcomingMoviesQuery,
  useConfigurationQuery,
} from "./redux/store/services/popular";
import { useSelector, useDispatch } from "react-redux";
import { getApiconfiguration, getGenres } from "./redux/store/HomeSlice";

function App() {
  const [search, setSearch] = useState("");
  const [background, setBackground] = useState("");
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  console.log(url.backdrop);

  const {
    data: popularMoviesData,
    error: popularMoviesError,
    isLoading: popularMoviesLoading,
  } = useGetPopularMoviesQuery();

  const {
    data: upcomingMoviesData,
    error: upcomingMoviesError,
    isLoading: upcomingMoviesLoading,
  } = useUpcomingMoviesQuery();
  // console.log(upcomingMoviesData);

  const {
    data: topRatedMoviesData,
    error: topRatedMovieError,
    isLoading: topRatedMoviesLoading,
  } = useGetTopRatedMoviesQuery();

  const {
    data: searchMoviesData,
    error: searchMoviesError,
    isLoading: searchMoviesLoading,
  } = useSearchMoviesQuery(search);

  const {
    data: configData,
    error: configError,
    isLoading: configLoading,
  } = useConfigurationQuery();
  // console.log(configData);

  useEffect(() => {
    if (configError) {
      console.error("Error fetching configuration:", configError);
    }
    if (configData) {
      const url = {
        backdrop: configData.images.secure_base_url + "original",
        poster: configData.images.secure_base_url + "original",
        profile: configData.images.secure_base_url + "original",
      };
      dispatch(getApiconfiguration(url));
    }
  }, [configData, dispatch, configError]);

  useEffect(() => {
    if (upcomingMoviesError) {
      console.error("Error fetching upcoming movies:", upcomingMoviesError);
    }
    if (upcomingMoviesData && url.backdrop) {
      const bg =
        url.backdrop +
        upcomingMoviesData.results[Math.floor(Math.random() * 20)]
          ?.backdrop_path;
      setBackground(bg);
    }
  }, [upcomingMoviesData, url, upcomingMoviesError]);
  console.log(background);

  // console.log(url);

  if (popularMoviesLoading || topRatedMoviesLoading) {
    return <h1>Loading...</h1>;
  }

  if (popularMoviesError || topRatedMovieError) {
    return <h1>{popularMoviesError}</h1>;
  }

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <img src={background} />
      <h1>Search movies</h1>
      {searchMoviesData?.results?.map((movie) => (
        <p key={movie.id}>{movie?.original_title}</p>
      ))}
      <h1>Popular movies</h1>
      {popularMoviesData?.results?.map((movie) => (
        <p key={movie.id}>{movie?.original_title}</p>
      ))}
      <h1>Top Rated movies</h1>
      {topRatedMoviesData?.results?.map((movie) => (
        <p key={movie.id}>{movie?.original_title}</p>
      ))}
      <h1>Upcoming movies</h1>
      {upcomingMoviesData?.results?.map((movie) => (
        <p key={movie.id}>{movie?.original_title}</p>
      ))}
    </>
  );
}

export default App;
