import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink exact to="/" className="nav-link" activeClassName="active-link">
        Home
      </NavLink>
      <NavLink
        exact
        to="/movies"
        className="nav-link"
        activeClassName="active-link"
      >
        Movies
      </NavLink>
    </nav>
  );
}
