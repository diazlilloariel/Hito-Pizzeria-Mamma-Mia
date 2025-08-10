import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PizzaContext = createContext({
  pizzas: [],
  loading: true,
  error: false,
  getById: () => null,
  refresh: async () => {},
});

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("http://localhost:5000/api/pizzas");
      if (!res.ok) throw new Error("Error al obtener pizzas");
      const data = await res.json();
      setPizzas(data);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const byId = useMemo(() => {
    const map = new Map();
    pizzas.forEach(p => map.set(p.id, p));
    return map;
  }, [pizzas]);

  const getById = (id) => byId.get(id) || null;

  return (
    <PizzaContext.Provider value={{ pizzas, loading, error, getById, refresh: fetchAll }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzas = () => useContext(PizzaContext);
