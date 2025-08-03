import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm } = formData;

    if (!email || !password || !passwordConfirm) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    alert("¡Registro exitoso!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Registro</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Ingresa tu Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Ingresa tu Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="passwordConfirm" className="form-label">
                Confirma tu Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                className="form-control"
                required
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
