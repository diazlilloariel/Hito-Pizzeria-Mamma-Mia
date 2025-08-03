import { Link } from "react-router-dom";

const CardPizza = ({ id, img, name, price, ingredients }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={img} className="card-img-top" alt={name} />

      <div className="card-body">
        <h5 className="card-title text-capitalize">{name}</h5>
      </div>

      {ingredients && ingredients.length > 0 && (
        <>
          <h6 className="ps-3 pt-2">Ingredientes:</h6>
          <ul className="list-group list-group-flush">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item text-capitalize">
                {ingredient}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="px-3 py-2 fw-bold">
        Precio: ${price.toLocaleString()}
      </div>

      <div className="card-body d-flex justify-content-between">
        <Link to={`/pizza/${id}`} className="btn btn-primary">
          Ver más
        </Link>
        <button className="btn btn-success">
          <i className="fas fa-cart-plus me-2"></i> Añadir
        </button>
      </div>
    </div>
  );
};

export default CardPizza;
