import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import fetchMovies from "../Services/fetchMovies";

export default function ReviewView() {
  const [review, setReview] = useState([]);
  const [status, setStatus] = useState("idle");
  const { url } = useRouteMatch();
  const { movieId } = useParams();

  useEffect(() => {
    setStatus("pending");
    fetchMovies("reviews", movieId).then((r) => {
      setReview(r);
      setStatus(r.length !== 0 ? "resolved" : "rejected");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <Route exact path={`${url}/reviews`}>
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
        <ul className="pseudo-el">
          {review.map((el) => (
            <li key={el.id}>
              <h2>{`Author: ${el.author}`}</h2>
              <p>{`${el.content}`}</p>
            </li>
          ))}
        </ul>
      )}
      {status === "rejected" && (
        <p className="pseudo-el">Couldnt find any reviews for this movie. :(</p>
      )}
    </Route>
  );
}
