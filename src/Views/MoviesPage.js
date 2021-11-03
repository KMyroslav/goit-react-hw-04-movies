import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import fetchMovies from "../Services/fetchMovies";
import { useHistory, useLocation, Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryMovies, setQueryMovies] = useState(null);
  const [status, setStatus] = useState("idle");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.search === "") {
      return;
    }
    const query = new URLSearchParams(location.search).get("query");
    setStatus("pending");
    fetchMovies("search", query).then((r) => {
      setQueryMovies(r);
      setStatus(r.length !== 0 ? "resolved" : "rejected");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("pending");
    fetchMovies("search", searchQuery).then((r) => {
      setQueryMovies(r);
      setStatus(r.length !== 0 || r === "" ? "resolved" : "rejected");
      history.push({ ...location, search: `query=${searchQuery}` });
    });
  }

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} handleSubmit={handleSubmit} />
      {status === "pending" && (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={5000}
        />
      )}
      {status === "resolved" && (
        <ul>
          {queryMovies.map((el) => (
            <li key={`${el.id}`}>
              <Link to={`/movies/${el.id}`}>{el.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
      {status === "rejected" && (
        <p>
          Couldn't find movie with name "{`${searchQuery}`}". Try checking your
          spelling
        </p>
      )}
    </div>
  );
}
