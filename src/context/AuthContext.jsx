import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const dummyUsers = [
  {
    id: "1",
    role: "Admin",
    email: "admin@entnt.in",
    password: "admin123",
  },
  {
    id: "2",
    role: "Patient",
    email: "john@entnt.in",
    password: "patient123",
    patientId: "p1",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email, password) => {
    const found = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("loggedInUser", JSON.stringify(found));

      // Navigate to the dashboard
      navigate(found.role === "Admin" ? "/admin" : "/patient");

      return { success: true, user: found };
    } else {
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
