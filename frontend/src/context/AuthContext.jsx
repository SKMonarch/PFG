import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();


const API = axios.create({
  baseURL: "http://localhost:8000", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

  const login = async (username, password) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await API.post("/auth/login", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      
      localStorage.setItem("token", res.data.access_token);

     
      const userRes = await API.get("/users/me");
      setUser(userRes.data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error.message);
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { API };