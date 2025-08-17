import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useUser } from "../context/UserProvider";

const Cart = () => {
  const { cart, increment, decrement, removeItem, clearCart, total } =
    useCart();
  const { user } = useUser();

  if (!cart.length) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-3">Tu carrito está vacío</h2>
        <p className="text-muted">
          Agrega pizzas desde el inicio para verlas aquí.
        </p>
        <Link to="/" className="btn btn-primary mt-2">
          Ir al Home
        </Link>
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
                {product.price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-danger"
                onClick={() => decrement(product.id)}
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="px-2">{product.quantity}</span>
              <button
                className="btn btn-primary"
                onClick={() => increment(product.id)}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              className="btn btn-outline-danger ms-3"
              onClick={() => removeItem(product.id)}
              aria-label="Eliminar del carrito"
              title="Eliminar"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>

      <hr />
      <div className="mt-4 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <h4 className="mb-0">
          Total:{" "}
          <strong>
            {total.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </strong>
        </h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button
            className={`btn ${user ? "btn-success" : "btn-secondary"}`} disabled={!user}>Pagar
          </button>
          {!user && (
            <p className="text-danger mt-2">Debes iniciar sesión para pagar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
