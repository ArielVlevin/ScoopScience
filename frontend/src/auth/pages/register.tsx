import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import React, { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Get context and assert it's not undefined
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { register } = authContext;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle the error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
