import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import fetchMovies from "../Services/fetchMovies";

export default function Cast() {
  const [cast, setCast] = useState(null);
  const [status, setStatus] = useState("idle");
  const { url } = useRouteMatch();
  const { movieId } = useParams();

  useEffect(() => {
    setStatus("pending");
    fetchMovies("credits", movieId).then((r) => {
      setStatus(r.length !== 0 ? "resolved" : "rejected");
      setCast(r);
    });
  }, [movieId]);

  return (
    <Route exact path={`${url}/cast`}>
      {status === "pending" && (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={5000}
          className="centered"
        />
      )}
      {status === "resolved" && (
        <ul className="cast-list pseudo-el">
          {cast &&
            cast.map((el) => (
              <li className="cast-list-item" key={el.cast_id}>
                <img
                  className="cast-img"
                  src={el.profile_path}
                  alt={`${el.original_name} (${el.character})`}
                />
                <div>
                  <h2 className="cast-title">{el.original_name}</h2>
                  <h3 className="cast-character">{`Character: ${el.character}`}</h3>
                </div>
              </li>
            ))}
        </ul>
      )}
      {status === "rejected" && (
        <p className="pseudo-el">Couldn't find movie cast. :(</p>
      )}
    </Route>
  );
}
