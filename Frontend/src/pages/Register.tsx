import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", form);
      Swal.fire("Success", "Registration completed!", "success");
      navigate("/login");
    } catch {
      Swal.fire("Error", "User already exists or server error", "error");
    }
  };

  return (
    <div className="login-wrapper">
      <div style={{height:"130%", width:"100%", position:"absolute"}}>
         <iframe src='https://my.spline.design/lines-7119922b4f9ea8e589c02da9fb65f2a9/' frameBorder='0' width='100%' height='100%'></iframe>
        </div>
      <div className="login-box">
        <h2>Create Account ✨</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="form-control mb-3"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" className="form-control mb-3"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
export default Register;
