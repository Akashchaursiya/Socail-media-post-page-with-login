import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        setAuth(true);
        setError("");
        setSuccess("Login successful!");
    navigate("/"); 
      } else {
        setError("Invalid username or password");
      }
    } else {
      setError("User not found");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (localStorage.getItem(username)) {
      setError("Username already exists");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      setSuccess("Sign-up successful! You can now log in.");
      setError("");
      setUsername("");
      setPassword("");
      setIsLogin(true);
    }
  };

  return (
    <div className="authpage">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
