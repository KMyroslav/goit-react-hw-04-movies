import Loader from "react-loader-spinner";
import fetchMovies from "../Services/fetchMovies";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [status, setStatus] = useState("idle");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    setStatus("pending");
    fetchMovies("trending").then((r) => {
      setTrendingMovies(r);
      setStatus(r.length !== 0 ? "resolved" : "rejected");
    });
  }, []);

  return (
    <div>
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
          {trendingMovies.map((el) => (
            <li key={el.id}>
              <Link to={`/movies/${el.id}`}>{el.title ?? el.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {status === "rejected" && <p>Couldn't find trending movies. :(</p>}
    </div>
  );
}
