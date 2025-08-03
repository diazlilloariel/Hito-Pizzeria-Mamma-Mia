import { Link } from "react-router-dom";

const Navbar = () => {
  const total = 25000;
  const token = false;

  return (
    <nav className="navbar fondo-nav navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Pizzería Mamma Mia!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/profile">
                    <i className="fas fa-user me-1"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/logout">
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/register">
                    <i className="fas fa-user-plus me-1"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <Link to="/cart" className="btn btn-outline-info d-flex align-items-center ms-3 btn-price">
            <i className="fas fa-shopping-cart me-2"></i>
            Total:{" "}
            {total.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
