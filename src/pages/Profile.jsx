const Profile = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-3">Perfil de Usuario</h2>

        <div className="mb-3 text-center">
          <p className="mb-1">Correo electrónico:</p>
          <strong>usuario@correo.com</strong>
        </div>

        <div className="d-grid">
          <button className="btn btn-danger">
            <i className="fas fa-sign-out-alt me-2"></i> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
