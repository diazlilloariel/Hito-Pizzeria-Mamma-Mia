import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePizzas } from "../context/PizzaProvider";
import { useCart } from "../context/CartProvider";

const Pizza = () => {
  const { idpizza } = useParams();
  const { getById, loading, error } = usePizzas();
  const { addItem } = useCart();

  const [pizza, setPizza] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fromCtx = getById(idpizza);
    if (fromCtx) {
      setPizza(fromCtx);
      setNotFound(false);
      return;
    }

    if (loading) return;

    const fetchById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pizzas/${idpizza}`);
        if (!res.ok) throw new Error("No encontrada");
        const data = await res.json();
        setPizza(data);
        setNotFound(false);
      } catch {
        setNotFound(true);
      }
    };

    fetchById();
  }, [idpizza, loading, getById]);

  if (loading && !pizza) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center text-danger mt-5">Error al cargar pizzas.</p>;
  if (notFound || !pizza) return <p className="text-center text-danger mt-5">Pizza no encontrada.</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <img src={pizza.img} alt={pizza.name} className="card-img-top" />
        <div className="card-body">
          <h2 className="card-title text-capitalize">{pizza.name}</h2>
          <h4 className="text-success mb-3">
            {pizza.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
          </h4>
          <h5>Ingredientes:</h5>
          <ul>
            {pizza.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
          <p className="mt-3">{pizza.desc}</p>
          <button
            className="btn btn-success mt-3"
            onClick={() => addItem({ id: pizza.id, name: pizza.name, img: pizza.img, price: pizza.price }, 1)}
          >
            <i className="fas fa-cart-plus me-2"></i> Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
