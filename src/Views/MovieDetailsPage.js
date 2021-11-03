import { lazy, Suspense } from "react";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useParams, NavLink, useRouteMatch } from "react-router-dom";
import fetchMovies from "../Services/fetchMovies";
// import CastView from "./CastView";
// import ReviewView from "./ReviewView";

const CastView = lazy(() =>
  import("./CastView" /* webpackChunkName: "cast-view" */)
);
const ReviewView = lazy(() =>
  import("./ReviewView" /* webpackChunkName: "review-view" */)
);

export default function MoviesDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("idle");
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    setStatus("pending");
    fetchMovies("details", movieId).then((r) => {
      setMovie(r);
      setStatus(r.length !== 0 ? "resolved" : "rejected");
    });
    return setMovie(null);
  }, [movieId]);

  return (
    <div>
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
        <div>
          <div className="details-wrapper">
            <img
              className="movie-poster"
              src={movie.poster_path}
              alt={`${movie.title} poster`}
            />
            <div className="details-text-content-wrapper">
              <div>
                <h2>{`${movie.title} (${movie.release_date?.slice(0, 4)})`}</h2>
                <p>{`User Score: ${movie.vote_average}/10`}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
              </div>
              <ul>
                {movie.genres?.map((el) => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>
              <ul className="nested-list">
                <li className="nested-list-item">
                  <NavLink
                    exact
                    to={`${url}/cast`}
                    className="nested-link"
                    activeClassName="active-nested-link"
                  >
                    Cast
                  </NavLink>
                </li>
                <li className="nested-list-item">
                  <NavLink
                    exact
                    to={`${url}/reviews`}
                    className="nested-link"
                    activeClassName="active-nested-link"
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <Suspense
            fallback={
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={360}
                width={360}
                className="centered"
              />
            }
          >
            <CastView />
            <ReviewView />
          </Suspense>
        </div>
      )}
      {status === "rejected" && (
        <p>Couldn't find movie Details for this movie.</p>
      )}
    </div>
  );
}
