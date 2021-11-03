import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
// import HomePage from "./Views/HomePage";
// import MoviesPage from "./Views/MoviesPage";
// import MoviesDetailsPage from "./Views/MovieDetailsPage";

const HomePage = lazy(() =>
  import("./Views/HomePage" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./Views/MoviesPage" /* webpackChunkName: "movies-page" */)
);
const MoviesDetailsPage = lazy(() =>
  import("./Views/MovieDetailsPage" /* webpackChunkName: "MoviesDetailsPage" */)
);

function App() {
  return (
    <div className="container">
      <Header />
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
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MoviesDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
