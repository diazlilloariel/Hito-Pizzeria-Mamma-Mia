import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const logout = () => setUser(false);


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (ctx === undefined) throw new Error("useUser debe usarse dentro de <UserProvider>.");
  return ctx;
};

export default UserProvider;
