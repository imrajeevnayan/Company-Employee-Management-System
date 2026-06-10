import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire("Error", "Please enter both email and password", "warning");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);

      Swal.fire("Login Successful 🎉", "Welcome back!", "success");
      navigate("/language");
    } catch (err: any) {
      if (err.response?.status === 401) {
        Swal.fire("Login Failed", "Invalid email or password", "error");
      } else {
        Swal.fire("Error", "Something went wrong. Try again!", "error");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div style={{height:"130%", width:"100%", position:"absolute"}}>
         <iframe src='https://my.spline.design/lines-7119922b4f9ea8e589c02da9fb65f2a9/' frameBorder='0' width='100%' height='100%'></iframe>
        </div>
      <div className="login-box">
        
        <h2>Welcome Back 👋</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
