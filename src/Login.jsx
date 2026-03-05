import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import {jwtDecode} from "jwt-decode";
import {useNavigate ,Link} from "react-router-dom";
import Admin from "./Admin";
import User from "./User";
export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("https://localhost:7062/api/Authorization/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: username,
        Password: password,
        role:"User"
      })
    });

    if (!response.ok) {
      alert("Invalid username or password");
      return;
    }

    const data = await response.json()

    // store token
    localStorage.setItem("token", data.token);

    // decode token
    const decoded = jwtDecode(data.token);

    const role = decoded.role;
    console.log(decoded)
    // redirect based on role
    console.log(role);
    if (role ==="Admin") {
      console.log("In admin")
     navigate("/admin-dashboard")
    } else {
      console.log("in user")
    navigate("/user-dashboard")
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
      Login
    </h3>

    <form onSubmit={handleLogin}>

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
        Login
      </button>

    </form>

    <div className="text-center mt-3">
      <span>Don't have an account? </span>
      <Link to="/register" className="text-decoration-none fw-semibold">
        Register
      </Link>
    </div>

  </div>
</div>
    
  );
}

