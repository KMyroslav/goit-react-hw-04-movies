import axios from "axios";

const BASE_URL = "https://api.themoviedb.org";
const KEY = "72c5bcdb8bd2b4c9569c9653ae343ba4";

export default function fetchMovies(option, query, page) {
  switch (option) {
    case "trending":
      return axios
        .get(`${BASE_URL}/3/trending/all/day?api_key=${KEY}`)
        .then((r) => r.data.results);

    case "search":
      return axios
        .get(
          `${BASE_URL}/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then((r) => r.data.results);

    case "details":
      return axios
        .get(`${BASE_URL}/3/movie/${query}?api_key=${KEY}&language=en-US`)
        .then((r) => r.data)
        .then((r) => {
          return {
            ...r,
            poster_path: `https://image.tmdb.org/t/p/w300${r.poster_path}`,
          };
        });

    case "credits":
      return axios
        .get(
          `${BASE_URL}/3/movie/${query}/credits?api_key=${KEY}&language=en-US`
        )
        .then((r) => r.data.cast)
        .then((r) => {
          return r.map((el) => ({
            ...el,
            profile_path: `${
              el.profile_path &&
              `https://image.tmdb.org/t/p/w300${el.profile_path}`
            }`,
          }));
        });

    case "reviews":
      return axios
        .get(
          `${BASE_URL}/3/movie/${query}/reviews?api_key=${KEY}&language=en-US&page=1`
        )
        .then((r) => r.data.results);

    default:
      console.log("default fetchMovies");
  }
}
