import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { useCart } from "../context/CartProvider";
import { useUser } from "../context/UserProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { total, itemCount } = useCart();
  const { user, logout } = useUser();

  return (
    <nav
      className={`navbar fondo-nav navbar-expand-lg fixed-top ${
        theme === "dark" ? "bg-dark navbar-dark" : "bg-body-tertiary"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Pizzería Mamma Mia!</Link>

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
            {/* Home siempre visible */}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/profile">
                    <i className="fas fa-user me-1"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  {/* CORRECCIÓN: agregamos type="button" */}
                  <button
                    className="nav-link px-3 btn btn-link"
                    type="button"
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </button>
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

          <Link
            to="/cart"
            className="btn btn-success d-flex align-items-center ms-3 btn-price position-relative"
            title="Ver carrito"
          >
            <i className="fas fa-shopping-cart me-2"></i>
            {itemCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.75rem" }}
              >
                {itemCount}
              </span>
            )}
            <span>
              Total:{" "}
              {total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </span>
          </Link>

          <button className="btn btn-outline-secondary ms-2" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Modo oscuro" : "☀️ Modo claro"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
