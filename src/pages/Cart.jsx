import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        if (!res.ok) throw new Error("Error al obtener las pizzas");
        const data = await res.json();

        const pizzasConCantidad = data.map((pizza) => ({
          ...pizza,
          quantity: 1,
        }));

        setCart(pizzasConCantidad);
      } catch (err) {
        console.error("Error al cargar las pizzas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((pizza) =>
      pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((pizza) =>
        pizza.id === id ? { ...pizza, quantity: pizza.quantity - 1 } : pizza
      )
      .filter((pizza) => pizza.quantity > 0);
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (acc, pizza) => acc + pizza.price * pizza.quantity,
    0
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Detalles del pedido:</h2>

      <div className="d-flex flex-column gap-3">
        {cart.map((product) => (
          <div
            key={product.id}
            className="d-flex align-items-center border rounded p-3 shadow-sm"
          >
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              className="me-3 rounded"
            />
            <div className="flex-grow-1">
              <h5 className="mb-1 text-capitalize">{product.name}</h5>
              <p className="mb-0 fw-bold">
                ${product.price.toLocaleString()}
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-danger"
                onClick={() => decreaseQuantity(product.id)}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                className="btn btn-primary"
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <div className="mt-4">
        <h4>Total: ${total.toLocaleString()}</h4>
        <button className="btn btn-success mt-2">Pagar</button>
      </div>
    </div>
  );
};

export default Cart;
