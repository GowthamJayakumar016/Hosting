import { useState } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    const response = await fetch("https://localhost:7062/api/Authorization/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: "User"
      })
    });

    if (response.ok) {
      alert("Registration successful");
      setUsername("");
      setPassword("");
    } else {
      alert("User already exists");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)"
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>

        <h3 className="text-center text-primary mb-4">
          Register
        </h3>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">Username</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>

        </form>

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/" className="text-decoration-none fw-semibold">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;