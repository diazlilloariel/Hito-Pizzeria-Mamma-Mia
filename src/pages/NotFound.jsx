import { Link } from "react-router-dom";
import gif404 from "../assets/img/404-404error.gif";

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 text-danger">Error 404</h1>
      <p className="lead">La ruta de la página que buscas no existe.</p>

      {/* Contenedor centrado para la imagen */}
      <div className="d-flex justify-content-center my-4">
        <img
          src={gif404}
          alt="Página no encontrada"
          className="img-fluid"
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Botón centrado debajo del GIF */}
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
