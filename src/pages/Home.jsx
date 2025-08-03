import { useEffect, useState } from "react";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        if (!res.ok) throw new Error("Error al obtener las pizzas");
        const data = await res.json();
        setPizzas(data);
      } catch (err) {
        console.error("Error al cargar las pizzas:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center text-danger mt-5">
        Error al cargar las pizzas.
      </p>
    );

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {pizzas.map((pizza) => (
            <div className="col-md-4 mb-4" key={pizza.id}>
              <CardPizza
                id={pizza.id}
                img={pizza.img}
                name={pizza.name}
                ingredients={pizza.ingredients}
                price={pizza.price}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
