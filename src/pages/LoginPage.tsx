import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.scss";
import { login, setTokenWithExpiry } from "../services/authService";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); 
    setSuccessMessage(""); 

    try {
      const response = await login(username, password);
      const token = response.data.token;
      setTokenWithExpiry(token, 180000000000);
      setSuccessMessage("Login successful!"); 
      
      setTimeout(() => {
        navigate("/"); 
      }, 2000); 
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else if (err.response && err.response.status === 403) {
        setError("Your account has been disabled. Please contact support.");
      } else if (err.response && err.response.status >= 500) {
        setError("Invalid username or password.");
      } else if (!err.response) {
        setError("Unable to connect to the server. Please check your network connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} 
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
